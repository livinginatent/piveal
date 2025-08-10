/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OtpInput } from "react-native-otp-entry";
import { resendOtpApi, verifyOtpApi } from "../api/authService";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/src/context/AuthContext";
import { CustomCTAButton } from "@/src/components/ui/Buttons/CTAButton";
import { colors } from "@/src/theme/theme";
import { normalize } from "@/src/theme/normalize";

const VerifyOtpScreen = () => {
  const { verifyOtp } = useAuth();
  const { t } = useTranslation();
  const [storedEmail, setstoredEmail] = useState<string | null>(null);
  const [storedUsername, setstoredUsername] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState<string | null>(null);
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const otpInputRef = useRef<any>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      const email = await SecureStore.getItemAsync("tempEmail");
      const username = await SecureStore.getItemAsync("tempUsername");

      setstoredEmail(email);
      setstoredUsername(username);
      setIdentifier(email || username);
    };
    loadUserInfo();
  }, []);

  const handleOtpChange = (otp: string) => {
    setOtpValue(otp);
    // Clear errors when user starts typing
    if (otpError) setOtpError(null);
    if (resendError) setResendError(null);
  };

  const getErrorMessage = (error: any): string => {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    return error.message || "An unexpected error occurred";
  };

  const getErrorCode = (error: any): string | null => {
    return error.response?.data?.code || null;
  };

  const handleVerificationError = (error: any) => {
    const errorMessage = getErrorMessage(error);
    const errorCode = getErrorCode(error);

    // Handle specific error codes for better UX
    switch (errorCode) {
      case "USER_NOT_FOUND":
        setOtpError(t("userNotFound"));
        break;
      case "ALREADY_VERIFIED":
        setOtpError(t("emailAlreadyVerified"));
        break;
      case "INVALID_OTP":
        setOtpError(t("invalidOtp"));
        break;
      case "OTP_EXPIRED":
        setOtpError(t("otpExpired"));
        break;
      case "RATE_LIMITED_COOLDOWN":
      case "RATE_LIMITED_HOURLY":
        setOtpError(errorMessage); // Display exact rate limit message
        break;
      default:
        // Handle legacy error messages (fallback)
        if (errorMessage === "User not found") {
          setOtpError(t("userNotFound"));
        } else if (errorMessage === "User is already verified") {
          setOtpError(t("userAlreadyVerified"));
        } else if (errorMessage === "Invalid OTP") {
          setOtpError(t("invalidOtp"));
        } else if (errorMessage === "Your OTP has expired") {
          setOtpError(t("otpExpired"));
        } else if (errorMessage === "Email already verified") {
          setOtpError(t("emailAlreadyVerified"));
        } else if (
          errorMessage.includes("Please wait") &&
          errorMessage.includes("minute(s) before requesting")
        ) {
          setOtpError(errorMessage);
        } else if (errorMessage.includes("OTP resend limit reached")) {
          setOtpError(errorMessage);
        } else {
          setOtpError(errorMessage);
        }
    }
  };

  const handleResendError = (error: any) => {
    const errorMessage = getErrorMessage(error);
    const errorCode = getErrorCode(error);

    // Handle specific error codes
    switch (errorCode) {
      case "USER_NOT_FOUND":
        setResendError(t("userNotFound"));
        break;
      case "ALREADY_VERIFIED":
        setResendError(t("emailAlreadyVerified"));
        break;
      case "RATE_LIMITED_COOLDOWN":
      case "RATE_LIMITED_HOURLY":
        setResendError(errorMessage);
        break;
      default:
        // Handle legacy error messages (fallback)
        if (errorMessage === "Email already verified") {
          setResendError(t("emailAlreadyVerified"));
        } else if (errorMessage === "User not found") {
          setResendError(t("userNotFound"));
        } else if (
          errorMessage.includes("Please wait") &&
          errorMessage.includes("minute(s) before requesting")
        ) {
          setResendError(errorMessage);
        } else if (errorMessage.includes("OTP resend limit reached")) {
          setResendError(errorMessage);
        } else {
          setResendError(errorMessage);
        }
    }
  };

  const onSubmit = async () => {
    if (!identifier) {
      setOtpError(t("identifierNotFound"));
      return;
    }
    if (otpValue.length !== 4) {
      setOtpError(t("otpIncomplete"));
      return;
    }

    setIsLoading(true);
    setOtpError(null);
    setResendError(null);

    try {
      const payload = {
        emailOrUsername: identifier,
        otp: otpValue,
      };

      const isFromLogin = await SecureStore.getItemAsync("isFromLogin");

      if (isFromLogin === "true") {
        await verifyOtpApi(payload);
        await AsyncStorage.removeItem("isFromLogin");
        await AsyncStorage.removeItem("tempEmail");
        await AsyncStorage.removeItem("tempUsername");
        router.replace("/(auth)/LoginScreen");
        Alert.alert(t("success"), t("otpSuccess"));
      } else {
        const response = await verifyOtpApi(payload);
        await verifyOtp(response.accessToken, response.refreshToken);
        await AsyncStorage.removeItem("tempEmail");
        await AsyncStorage.removeItem("tempUsername");
        router.replace("/(app)/(tabs)/home");
      }
    } catch (error: any) {
      console.error("OTP Verification error:", error);
      handleVerificationError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!identifier) {
      setResendError(t("identifierNotFound"));
      return;
    }

    setIsResending(true);
    setOtpError(null);
    setResendError(null);

    try {
      const payload = {
        emailOrUsername: identifier,
      };
      const response = await resendOtpApi(payload);

      if (otpInputRef.current) {
        otpInputRef.current.setValue("");
      }
      setOtpValue("");

      console.log("OTP Resent successfully:", response);
      Alert.alert(t("success"), t("otpResent"));
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      handleResendError(error);
    } finally {
      setIsResending(false);
    }
  };

  const getDisplayIdentifier = () => {
    return storedEmail || storedUsername || identifier;
  };

  // Show resend button if there's an error or if user wants to resend
  const shouldShowResendButton = otpError || resendError;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.fullScreenContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#ff6b35" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{t("otpTitle")}</Text>
            <Text style={styles.subtitle}>
              {t("otpSubtitle", { email: getDisplayIdentifier() })}
            </Text>

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

            {/* Display verification errors */}
            {otpError && <Text style={styles.errorText}>{otpError}</Text>}

            {/* Display resend errors */}
            {resendError && <Text style={styles.errorText}>{resendError}</Text>}

            {/* Main action button */}
            <View style={styles.buttonStyle}>
              <CustomCTAButton
                label={isLoading ? t("verifying") : t("verifyOtp")}
                onPress={onSubmit}
                disabled={isLoading || isResending}
              />
            </View>

            {/* Resend button - show when there are errors or user needs to resend */}
            {shouldShowResendButton && (
              <View style={styles.resendButtonStyle}>
                <CustomCTAButton
                  label={isResending ? t("resending") : t("resendOtp")}
                  onPress={resendOtp}
                  disabled={isLoading || isResending}
                  variant="outlined" // Assuming you have a secondary variant
                />
              </View>
            )}

            {/* Optional: Add a "Resend OTP" text button for cases without errors */}
            {!shouldShowResendButton && (
              <View style={styles.resendTextContainer}>
                <Text style={styles.resendText}>{t("didntReceiveCode")} </Text>
                <TouchableOpacity onPress={resendOtp} disabled={isResending}>
                  <Text
                    style={[
                      styles.resendLink,
                      isResending && styles.disabledLink,
                    ]}
                  >
                    {isResending ? t("resending") : t("resendOtp")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  fullScreenContent: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.textPrimaryBlack,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#636e72",
    lineHeight: 24,
    marginBottom: 60,
  },
  otpContainer: {
    display: "flex",
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
    fontSize: normalize("font", 14),
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
  },
  buttonStyle: {
    marginTop: normalize("height", 14),
    alignSelf: "center",
  },
  resendButtonStyle: {
    marginTop: normalize("height", 10),
    alignSelf: "center",
  },
  resendTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: normalize("height", 20),
  },
  resendText: {
    fontSize: normalize("font", 14),
    color: "#636e72",
  },
  resendLink: {
    fontSize: normalize("font", 14),
    color: colors.orange500,
    fontWeight: "600",
  },
  disabledLink: {
    color: "#95a5a6",
  },
});

export default VerifyOtpScreen;
