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
import { normalize } from "../theme/normalize";
import { colors } from "../theme/theme";
import { CustomCTAButton } from "../components/ui/Buttons/CTAButton";
import { resendOtpApi, verifyOtpApi } from "../api/authService";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

const VerifyOtpScreen = () => {
  const { verifyOtp } = useAuth();
  const { t } = useTranslation();
  const [storedEmail, setstoredEmail] = useState<string | null>(null);
  const [storedUsername, setstoredUsername] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState<string | null>(null); // This will store either email or username
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const otpInputRef = useRef<any>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      const email = await AsyncStorage.getItem("tempEmail");
      const username = await AsyncStorage.getItem("tempUsername");

      setstoredEmail(email);
      setstoredUsername(username);

      // Set identifier to whichever is available (email takes priority)
      setIdentifier(email || username);
    };
    loadUserInfo();
  }, []);

  const handleOtpChange = (otp: string) => {
    setOtpValue(otp);
  };

  const onSubmit = async () => {
    if (!identifier) {
      Alert.alert(t("error"), t("identifierNotFound")); // Updated error message
      return;
    }
    if (otpValue.length !== 4) {
      Alert.alert(t("error"), t("otpIncomplete"));
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        emailOrUsername: identifier, // Use identifier instead of email
        otp: otpValue,
      };

      // Clean up both possible temp storage items
      await AsyncStorage.removeItem("tempEmail");
      await AsyncStorage.removeItem("tempUsername");

      setOtpError(null);
      Alert.alert(t("success"), t("otpSuccess"));

      const isFromLogin = await AsyncStorage.getItem("isFromLogin");

      if (isFromLogin === "true") {
        // User came from LoginScreen, so navigate back to LoginScreen
        const response = await verifyOtpApi(payload);
        console.log("OTP Verification successful:", response);
        await AsyncStorage.removeItem("isFromLogin");
        router.replace("/(auth)/LoginScreen");
      } else {
        const response = await verifyOtpApi(payload);
        console.log("OTP Verification successful:", response);

        await verifyOtp(response.accessToken, response.refreshToken);
        // User came from RegisterScreen, log them in and navigate to the home screen
        router.replace("/(app)/(tabs)/home");
      }
    } catch (error: any) {
      console.error("OTP Verification error:", error.message);
      let errorMessage = t("otpVerificationError");
      if (
        error.response &&
        error.response.data &&
        (error.response.data.message || error.response.data.error)
      ) {
        errorMessage = error.response.data.message || error.response.data.error;
      }
      if (errorMessage === "User not found") {
        setOtpError(t("userNotFound"));
      } else if (errorMessage === "User is already verified") {
        setOtpError(t("userAlreadyVerified"));
      } else if (errorMessage === "Invalid OTP") {
        setOtpError(t("invalidOtp"));
      } else if (errorMessage === "Your OTP has expired") {
        setOtpError(t("otpExpired"));
      } else {
        setOtpError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!identifier) {
      Alert.alert(t("error"), t("identifierNotFound"));
      return;
    }

    try {
      const payload = {
        emailOrUsername: identifier, // Use identifier instead of email
      };
      const response = await resendOtpApi(payload);
      if (otpInputRef.current) {
        otpInputRef.current.setValue("");
      }
      setOtpValue("");
      setOtpError(null);
      console.log("OTP Resent successfully:", response);
      Alert.alert(t("success"), t("otpResent")); // Add success message
    } catch (error: any) {
      console.log(error);
      Alert.alert(t("error"), t("resendOtpError")); // Add error handling
    }
  };

  // Get display text for subtitle (prefer email over username for display)
  const getDisplayIdentifier = () => {
    return storedEmail || storedUsername || identifier;
  };

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
            {otpError && <Text style={styles.otpErrorText}>{t(otpError)}</Text>}
            {otpError ? (
              <View style={styles.buttonStyle}>
                <CustomCTAButton
                  label={t("resendOtp")}
                  onPress={resendOtp}
                  disabled={isLoading}
                />
              </View>
            ) : (
              <View style={styles.buttonStyle}>
                <CustomCTAButton
                  label={isLoading ? t("verifying") : t("verifyOtp")}
                  onPress={onSubmit}
                  disabled={isLoading}
                />
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
    color: "#2d3436",
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
  otpErrorText: {
    color: "#d63031",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  buttonStyle: {
    marginTop: normalize("height", 14),
    alignSelf: "center",
  },
});

export default VerifyOtpScreen;
