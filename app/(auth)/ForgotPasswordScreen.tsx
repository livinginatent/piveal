/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";

import { OtpInput } from "react-native-otp-entry";
import {
  initiatePasswordResetApi,
  verifyPasswordOtpApi,
  resetPasswordApi,
} from "@/app/api/passwordService";
import * as SecureStore from "expo-secure-store";
import { CustomInput } from "@/src/components/ui/Buttons/InputButton";
import { CustomCTAButton } from "@/src/components/ui/Buttons/CTAButton";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import { renderLoginText } from "@/src/components/Auth/HaveAccount/HaveAccount";
import { GoogleIcon } from "@/src/icons/social/GoogleIcon";
import FacebookIcon from "@/src/icons/social/FacebookIcon";
import AppleIcon from "@/src/icons/social/AppleIcon";

type FormData = {
  emailOrUsername: string;
  newPassword?: string;
  confirmPassword?: string;
};

type PasswordResetStep = "initiate" | "verify" | "reset";

const ForgotPasswordScreen = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<PasswordResetStep>("initiate");
  const [isLoading, setIsLoading] = useState(false);
  const [emailOrUsernameError, setEmailOrUsernameError] = useState<
    string | null
  >(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(60); // 60 seconds cooldown
  const [otpValue, setOtpValue] = useState("");
  const otpInputRef = useRef<any>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: { emailOrUsername: "" },
  });

  const watchNewPassword = watch("newPassword");

  // Timer for OTP resend cooldown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0 && currentStep === "verify") {
      timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown, currentStep]);

  // Handle OTP input change
  const handleOtpChange = (otp: string) => {
    setOtpValue(otp);
    if (otpError) setOtpError(null);
  };

  // Step 1: Initiate Password Reset
  const handleInitiatePasswordReset = async (data: FormData) => {
    setIsLoading(true);

    try {
      await initiatePasswordResetApi({ identifier: data.emailOrUsername });
      await SecureStore.setItemAsync(
        "tempIdentifier",
        JSON.stringify(data.emailOrUsername)
      );
      setCurrentStep("verify");
      setResendCooldown(60);
    } catch (error: any) {
      const message = error.response?.data?.message;
      setEmailOrUsernameError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (otpValue.length !== 4) {
      setOtpError(t("invalidOtpLength"));
      return;
    }
    setIsLoading(true);
    setOtpError(null);
    const identifier = JSON.parse(
      (await SecureStore.getItemAsync("tempIdentifier")) || "null"
    );
    if (!identifier) {
      setOtpError(t("otpIdentifierMissing"));
      setIsLoading(false);
      return;
    }
    try {
      await verifyPasswordOtpApi({ identifier, otp: otpValue });
      setCurrentStep("reset");
    } catch (error: any) {
      const message =
        error.response?.data?.message; /* || t("otpVerificationError") */
      setOtpError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (data: FormData) => {
    setIsLoading(true);
    const identifier = JSON.parse(
      (await SecureStore.getItemAsync("tempIdentifier")) || "null"
    );
    if (!identifier) {
      setEmailOrUsernameError(t("otpIdentifierMissing"));
      setIsLoading(false);
      return;
    }
    try {
      await resetPasswordApi({
        identifier,
        newPassword: data.newPassword!,
      });
      await SecureStore.deleteItemAsync("tempIdentifier");
      router.push({
        pathname: "/(auth)/LoginScreen",
        params: { successMessage: t("passwordResetSuccess") },
      });
    } catch (error: any) {
      // Handle password reset errors if any
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const identifier = await SecureStore.getItemAsync("tempIdentifier");
    if (!identifier) {
      setEmailOrUsernameError(t("resendIdentifierMissing"));
      return;
    }
    setResendCooldown(60);
    try {
      await initiatePasswordResetApi({ identifier });
      setOtpError(null);
    } catch (error: any) {
      setOtpError(error.response?.data?.message || t("resendOtpError"));
    }
  };

  const renderContentByStep = () => {
    switch (currentStep) {
      case "initiate":
        return (
          <View style={styles.formContainer}>
            <Text style={styles.subtitle}>{t("enterForgotEmail")}</Text>
            <Controller
              control={control}
              name="emailOrUsername"
              rules={{
                required: t("emailOrUsernameRequired"),
                validate: {
                  validFormat: (value) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
                    if (emailRegex.test(value) || usernameRegex.test(value)) {
                      return true;
                    }
                    return t("invalidEmailOrUsername");
                  },
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <CustomInput
                  label={t("emailOrUsername")}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("enterEmailOrUsername")}
                  variant={error || emailOrUsernameError ? "error" : "default"}
                  errorText={error?.message || emailOrUsernameError}
                />
              )}
            />
            <CustomCTAButton
              onPress={handleSubmit(handleInitiatePasswordReset)}
              style={{ width: "100%", marginTop: normalize("vertical", 8) }}
              label={t("sendOtp")}
            />
          </View>
        );
      case "verify":
        return (
          <View style={styles.formContainer}>
            <Text style={styles.subtitle}>{t("enterOtp")}</Text>
            <OtpInput
              numberOfDigits={4}
              onTextChange={handleOtpChange}
              onFilled={handleOtpChange}
              focusColor={colors.orange400}
              ref={otpInputRef}
              theme={{
                containerStyle: styles.otpContainer,
                pinCodeContainerStyle: styles.pinCodeContainer,
              }}
            />
            {otpError && <Text style={styles.errorText}>{otpError}</Text>}
            <CustomCTAButton
              onPress={handleVerifyOtp}
              style={{ width: "100%", marginTop: normalize("vertical", 8) }}
              label={t("verifyOtp")}
            />
            <View style={styles.resendTextContainer}>
              <Text style={styles.resendText}>{t("didntReceiveCode")}</Text>
              <TouchableOpacity
                onPress={handleResendOtp}
                disabled={resendCooldown > 0 || isLoading}
              >
                <Text
                  style={[
                    styles.resendLink,
                    (resendCooldown > 0 || isLoading) && styles.disabledLink,
                  ]}
                >
                  {resendCooldown > 0
                    ? `${resendCooldown}s ${t("resendIn")} `
                    : t("resendNow")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "reset":
        return (
          <View style={styles.formContainer}>
            <Text style={styles.subtitle}>{t("enterNewPassword")}</Text>
            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: t("passwordRequired"),
                minLength: {
                  value: 6,
                  message: t("passwordMinLengthMessage"),
                },
                maxLength: {
                  value: 12,
                  message: t("passwordMaxLengthMessage"),
                },
                pattern: {
                  value: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
                  message: t("passwordSpecialCharMessage"),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <CustomInput
                    label={t("newPassword")}
                    value={value}
                    onChangeText={onChange}
                    placeholder={t("passwordPlaceholder")}
                    isSecure={true}
                    variant={errors.newPassword ? "error" : "default"}
                    errorText={errors.newPassword?.message}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: t("confirmPasswordRequired"),
                validate: (value) =>
                  value === watchNewPassword || t("passwordsMustMatch"),
              }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <CustomInput
                    label={t("confirmPasswordLabel")}
                    value={value}
                    onChangeText={onChange}
                    placeholder={t("confirmPasswordPlaceholder")}
                    isSecure={true}
                    variant={errors.confirmPassword ? "error" : "default"}
                    errorText={errors.confirmPassword?.message}
                  />
                </View>
              )}
            />
            <CustomCTAButton
              onPress={handleSubmit(handleResetPassword)}
              style={{ width: "100%", marginTop: normalize("vertical", 8) }}
              label={t("resetPassword")}
            />
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#ff6b35" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t("forgotPassword")}</Text>
        {renderContentByStep()}
        <View style={styles.registerContainer}>
          {renderLoginText({ screen: "login" })}
        </View>
        <View style={styles.orLogin}>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>{t("orSeparator")}</Text>
            <View style={styles.separatorLine} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <GoogleIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <FacebookIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <AppleIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg,
  },
  header: {
    paddingHorizontal: normalize("width", 20),
    paddingTop: normalize("vertical", 10),
    paddingBottom: normalize("vertical", 20),
  },
  backButton: {
    width: normalize("width", 40),
    height: normalize("height", 40),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: normalize("width", 20),
    width: "100%",
  },
  title: {
    fontSize: normalize("font", 28),
    textAlign: "center",
    fontWeight: "700",
    color: colors.textPrimaryBlack,
    marginBottom: normalize("vertical", 8),
    lineHeight: normalize("font", 36),
  },
  subtitle: {
    fontSize: normalize("font", 16),
    color: colors.grey400,
    textAlign: "center",
    lineHeight: normalize("font", 24),
    marginBottom: normalize("vertical", 24),
  },
  formContainer: {
    width: "100%",
    gap: normalize("vertical", 16),
  },
  otpContainer: {
    display: "flex",
    marginTop: normalize("vertical", 4),
    marginBottom: normalize("vertical", 20),
  },
  pinCodeContainer: {
    width: normalize("width", 84),
    height: normalize("height", 84),
    borderRadius: 4,
    borderColor: colors.orange500,
    borderWidth: 1.7,
  },
  errorText: {
    color: "#d63031",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
  resendTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: normalize("height", 20),
  },
  resendText: {
    fontSize: 14,
    color: "#636e72",
  },
  resendLink: {
    fontSize: 14,
    color: colors.orange500,
    fontWeight: "600",
  },
  disabledLink: {
    color: "#95a5a6",
  },
  registerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: normalize("horizontal", 2),
    marginTop: normalize("vertical", 20),
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: normalize("height", 20),
    width: "80%",
  },
  separatorLine: {
    flex: 1,
    height: normalize("height", 1),
    backgroundColor: "#e0e0e0",
  },
  separatorText: {
    marginHorizontal: normalize("width", 10),
    color: "#757575",
    fontSize: normalize("font", 16),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#ffffff",
    borderRadius: normalize("width", 50),
    borderWidth: 1,
    borderColor: "#EBE7F2",
    width: normalize("width", 50),
    height: normalize("height", 50),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: normalize("width", 10),
  },
  orLogin: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
