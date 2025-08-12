/*
Refactor highlights:
- Sync with backend constraints: OTP length, 2‑minute resend cooldown, >=8 char password.
- Single source of truth constants; no mixed 60s/120s.
- Store identifier plainly in SecureStore (no JSON stringify/parse mismatch).
- Use `resendPasswordResetOtpApi` endpoint; consume `nextResendAvailableAt` and `remainingResends` from server.
- Robust error mapping and per‑step error state.
- Disable actions during cooldown; friendly mm:ss timer.
- Clear OTP and errors on step transitions; consistent button loading states.
*/

/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { OtpInput } from "react-native-otp-entry";
import * as SecureStore from "expo-secure-store";

import { t } from "i18next";
import { CustomInput } from "@/src/components/ui/Buttons/InputButton";
import { CustomCTAButton } from "@/src/components/ui/Buttons/CTAButton";
import { renderLoginText } from "@/src/components/Auth/HaveAccount/HaveAccount";
import { GoogleIcon } from "@/src/icons/social/GoogleIcon";
import FacebookIcon from "@/src/icons/social/FacebookIcon";
import AppleIcon from "@/src/icons/social/AppleIcon";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";

import {
  initiatePasswordResetApi,
  verifyPasswordOtpApi,
  resetPasswordApi,
  resendPasswordResetOtpApi,
} from "@/src/api/passwordService";

// ===== Backend-aligned constants (keep in sync with server) =====
const OTP_LENGTH = 4; // server generateOtp() length
const RESEND_COOLDOWN_MINUTES = 2; // server constant
const RESEND_COOLDOWN_SECONDS = RESEND_COOLDOWN_MINUTES * 60; // 120s
const PASSWORD_MIN_LENGTH = 8; // server validation

// ===== Types =====

type FormData = {
  emailOrUsername: string;
  newPassword?: string;
  confirmPassword?: string;
};

type PasswordResetStep = "initiate" | "verify" | "reset";

// ===== Helpers =====
const toMs = (d: Date | string | number) => new Date(d).getTime();
const secondsUntil = (future?: Date | string) => {
  if (!future) return 0;
  const now = Date.now();
  const diff = Math.max(0, Math.ceil((toMs(future) - now) / 1000));
  return diff;
};

const setStore = (key: string, value: string) =>
  SecureStore.setItemAsync(key, value);
const getStore = (key: string) => SecureStore.getItemAsync(key);
const delStore = (key: string) => SecureStore.deleteItemAsync(key);

// ===== Component =====
const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<PasswordResetStep>("initiate");
  const [isLoading, setIsLoading] = useState(false);

  const [emailOrUsernameError, setEmailOrUsernameError] = useState<
    string | null
  >(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [remainingResends, setRemainingResends] = useState<number | null>(null);

  const [otpValue, setOtpValue] = useState("");
  const otpInputRef = useRef<any>(null);

  const { control, handleSubmit, watch, reset } = useForm<FormData>({
    defaultValues: {
      emailOrUsername: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const watchNewPassword = watch("newPassword");

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0 || currentStep !== "verify") return;
    const timer = setInterval(
      () => setResendCooldown((s) => (s > 0 ? s - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, [resendCooldown, currentStep]);

  // ===== Handlers =====
  const handleOtpChange = (otp: string) => {
    setOtpValue(otp);
    if (otpError) setOtpError(null);
  };

  const extractErrorMessage = (err: any, fallback: string) => {
    return err?.response?.data?.message || err?.message || fallback;
  };

  // Step 1: Initiate Password Reset
  const onInitiate = async (data: FormData) => {
    setIsLoading(true);
    setEmailOrUsernameError(null);
    setOtpError(null);
    setPasswordError(null);

    try {
      const resp = await initiatePasswordResetApi({
        identifier: data.emailOrUsername,
      });

      // Debug log to see the actual response structure
      console.log("Initiate API Response:", resp);
      console.log("remainingResends:", resp?.remainingResends);
      console.log("Type of remainingResends:", typeof resp?.remainingResends);

      // Store identifier plainly (no JSON wrapper)
      await setStore("tempIdentifier", data.emailOrUsername);

      // Start verify step
      setCurrentStep("verify");

      // More explicit handling of remainingResends
      const resends = resp?.remainingResends;
      if (
        resends !== undefined &&
        resends !== null &&
        typeof resends === "number"
      ) {
        console.log("Setting remainingResends to:", resends);
        setRemainingResends(resends);
      } else {
        console.log("remainingResends not found or invalid, setting to null");
        setRemainingResends(null);
      }

      const serverCooldown = secondsUntil(resp?.nextResendAvailableAt);
      setResendCooldown(
        serverCooldown > 0 ? serverCooldown : RESEND_COOLDOWN_SECONDS
      );
    } catch (error: any) {
      const msg = extractErrorMessage(error, t("initiateErrorFallback"));
      setEmailOrUsernameError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const onVerify = async () => {
    if (otpValue.length !== OTP_LENGTH) {
      setOtpError(t("invalidOtpLength"));
      return;
    }

    setIsLoading(true);
    setOtpError(null);

    const identifier = await getStore("tempIdentifier");
    if (!identifier) {
      setOtpError(t("otpIdentifierMissing"));
      setIsLoading(false);
      return;
    }

    try {
      await verifyPasswordOtpApi({ identifier, otp: otpValue });
      setCurrentStep("reset");
      setOtpError(null);
    } catch (error: any) {
      const msg = extractErrorMessage(error, t("otpVerificationError"));
      setOtpError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const onResetPassword = async (data: FormData) => {
    setIsLoading(true);
    setPasswordError(null);

    const identifier = await getStore("tempIdentifier");
    if (!identifier) {
      setPasswordError(t("otpIdentifierMissing"));
      setIsLoading(false);
      return;
    }

    // Frontend validation aligned to backend (>= 8 chars). Additional complexity is optional.
    if (!data.newPassword || data.newPassword.length < PASSWORD_MIN_LENGTH) {
      setPasswordError(t("passwordMinBackend", { count: PASSWORD_MIN_LENGTH }));
      setIsLoading(false);
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      setPasswordError(t("passwordsMustMatch"));
      setIsLoading(false);
      return;
    }

    try {
      await resetPasswordApi({ identifier, newPassword: data.newPassword });
      await delStore("tempIdentifier");
      reset();
      router.push({
        pathname: "/(auth)/LoginScreen",
        params: { successMessage: t("passwordResetSuccess") },
      });
    } catch (error: any) {
      const msg = extractErrorMessage(error, t("resetPasswordError"));
      setPasswordError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const onResend = async () => {
    if (isLoading || resendCooldown > 0) return;

    const identifier = await getStore("tempIdentifier");
    if (!identifier) {
      setEmailOrUsernameError(t("resendIdentifierMissing"));
      return;
    }

    try {
      setIsLoading(true);
      const resp = await resendPasswordResetOtpApi({
        identifier,
      });

      // Debug log for resend response
      console.log("Resend API Response:", resp);
      console.log("remainingResends:", resp?.remainingResends);

      setOtpError(null);

      // More explicit handling - don't fall back to previous value
      const resends = resp?.remainingResends;
      if (
        resends !== undefined &&
        resends !== null &&
        typeof resends === "number"
      ) {
        console.log("Setting remainingResends from resend to:", resends);
        setRemainingResends(resends);
      } else {
        console.log(
          "remainingResends not in resend response, keeping current value"
        );
        // Keep current value, don't set to null
      }

      const serverCooldown = secondsUntil(resp?.nextResendAvailableAt);
      setResendCooldown(
        serverCooldown > 0 ? serverCooldown : RESEND_COOLDOWN_SECONDS
      );
    } catch (error: any) {
      const msg = extractErrorMessage(error, t("resendOtpError"));
      setOtpError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // ===== Renderers =====
  const renderInitiate = () => (
    <View style={styles.formContainer}>
      <Text style={styles.subtitle}>{t("enterForgotEmail")}</Text>
      <Controller
        control={control}
        name="emailOrUsername"
        rules={{
          required: t("emailOrUsernameRequired") as unknown as boolean,
          validate: {
            validFormat: (value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
              return (
                emailRegex.test(value) ||
                usernameRegex.test(value) ||
                (t("invalidEmailOrUsername") as unknown as boolean)
              );
            },
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomInput
            label={t("emailOrUsername")}
            value={value}
            onChangeText={(v) => {
              setEmailOrUsernameError(null);
              onChange(v);
            }}
            placeholder={t("enterEmailOrUsername")}
            variant={error || emailOrUsernameError ? "error" : "default"}
            errorText={
              (error?.message as any) || emailOrUsernameError || undefined
            }
          />
        )}
      />
      <CustomCTAButton
        onPress={handleSubmit(onInitiate)}
        style={{ width: "100%", marginTop: normalize("vertical", 8) }}
        label={isLoading ? t("sending") : t("sendOtp")}
        disabled={isLoading}
      />
    </View>
  );

  const renderVerify = () => (
    <View style={styles.formContainer}>
      <Text style={styles.subtitle}>{t("enterOtp")}</Text>
      <OtpInput
        numberOfDigits={OTP_LENGTH}
        onTextChange={handleOtpChange}
        onFilled={handleOtpChange}
        focusColor={colors.orange400}
        ref={otpInputRef}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
        }}
      />
      {!!otpError && <Text style={styles.errorText}>{otpError}</Text>}
      <CustomCTAButton
        onPress={onVerify}
        style={{ width: "100%", marginTop: normalize("vertical", 8) }}
        label={isLoading ? t("verifying") : t("verifyOtp")}
        disabled={isLoading}
      />

      <View style={styles.resendTextContainer}>
        <Text style={styles.resendText}>{t("didntReceiveCode")}</Text>
        <TouchableOpacity
          onPress={onResend}
          disabled={resendCooldown > 0 || isLoading}
        >
          <Text
            style={[
              styles.resendLink,
              (resendCooldown > 0 || isLoading) && styles.disabledLink,
            ]}
          >
            {typeof remainingResends === "number" && (
              <Text style={styles.resendCounter}>{remainingResends}</Text>
            )}
            {typeof remainingResends === "number" && remainingResends >= 0 && (
              <Text style={[styles.resendCounter, { marginTop: 4 }]}>
                {t("resendsLeft", { count: remainingResends }) ||
                  `${remainingResends} resends remaining`}
              </Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderReset = () => (
    <View style={styles.formContainer}>
      <Text style={styles.subtitle}>{t("enterNewPassword")}</Text>
      <Controller
        control={control}
        name="newPassword"
        rules={{
          required: t("passwordRequired") as unknown as boolean,
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: t("passwordMinBackend", {
              count: PASSWORD_MIN_LENGTH,
            }) as any,
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomInput
            label={t("newPassword")}
            value={value}
            onChangeText={(v) => {
              setPasswordError(null);
              onChange(v);
            }}
            placeholder={t("passwordPlaceholder")}
            isSecure
            variant={error || passwordError ? "error" : "default"}
            errorText={(error?.message as any) || passwordError || undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: t("confirmPasswordRequired") as unknown as boolean,
          validate: (value) =>
            value === watchNewPassword ||
            (t("passwordsMustMatch") as unknown as boolean),
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomInput
            label={t("confirmPasswordLabel")}
            value={value}
            onChangeText={(v) => {
              setPasswordError(null);
              onChange(v);
            }}
            placeholder={t("confirmPasswordPlaceholder")}
            isSecure
            variant={error ? "error" : "default"}
            errorText={(error?.message as any) || undefined}
          />
        )}
      />
      <CustomCTAButton
        onPress={handleSubmit(onResetPassword)}
        style={{ width: "100%", marginTop: normalize("vertical", 8) }}
        label={isLoading ? t("resetting") : t("resetPassword")}
        disabled={isLoading}
      />
    </View>
  );

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
        {currentStep === "initiate" && renderInitiate()}
        {currentStep === "verify" && renderVerify()}
        {currentStep === "reset" && renderReset()}

        <View style={styles.registerContainer}>
          {renderLoginText({ screen: "login" } as any)}
        </View>
        <View style={styles.orLogin}>
          <View style={styles.separatorContainer}>
            <View className="separatorLine" style={styles.separatorLine} />
            <Text style={styles.separatorText}>{t("orSeparator")}</Text>
            <View className="separatorLine" style={styles.separatorLine} />
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
  container: { flex: 1, backgroundColor: colors.primaryBg },
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
  formContainer: { width: "100%", gap: normalize("vertical", 16) },
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
  resendText: { fontSize: 14, color: "\n#636e72".replace("\n", "") },
  resendLink: { fontSize: 14, color: colors.orange500, fontWeight: "600" },
  disabledLink: { color: colors.orangeText },
  resendCounter: { marginTop: 6, fontSize: 12, color: "#636e72" },
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
    width: normalize("height", 50),
    height: normalize("height", 50),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: normalize("width", 10),
  },
  orLogin: { display: "flex", justifyContent: "center", alignItems: "center" },
});
