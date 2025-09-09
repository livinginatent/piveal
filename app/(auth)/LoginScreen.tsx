/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import { loginApi, resendOtpApi } from "@/src/api/authService";
import { useRouter } from "expo-router";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/src/context/AuthContext";
import { CustomInput } from "@/src/components/ui/Buttons/InputButton";
import { CustomCTAButton } from "@/src/components/ui/Buttons/CTAButton";
import { renderLoginText } from "@/src/components/Auth/HaveAccount/HaveAccount";
import { GoogleIcon } from "@/src/icons/social/GoogleIcon";
import FacebookIcon from "@/src/icons/social/FacebookIcon";
import AppleIcon from "@/src/icons/social/AppleIcon";
import { colors } from "@/src/theme/theme";
import { normalize } from "@/src/theme/normalize";
import pive from "@/src/assets/images/logo/pive.png";

/* import { useUserStore } from "../store/userStore";
 */
type FormData = {
  identifier: string;
  password: string;
  email: string;
};

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { identifier: "", password: "" },
  });
  const router = useRouter();
  const [identifierError, setIdentifierError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isAccountVerified, setIsAccountVerified] = useState<boolean>(true); // Track account verification status
  const [identifier, setIdentifier] = useState<string | null>(null);

  const { login } = useAuth();

  const onSubmit = async (data: FormData) => {
    const loginPayload = {
      identifier: data.identifier,
      password: data.password,
    };

    try {
      const response = await loginApi(loginPayload);

      if (response.user.isVerified) {
        const jsonAccessToken = JSON.stringify(response.accessToken);
        await login(jsonAccessToken, response.refreshToken);
        await SecureStore.setItemAsync("user", JSON.stringify(response.user));
        router.push("/(app)/(tabs)/home");
        /*    setUser({
          username: response.user.username,
          email: response.user.email,
        }); */
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.response?.data?.error;
      if (message === "User not found.") {
        setIdentifierError(t("userNotFound"));
        setPasswordError(null);
      } else if (message.includes("Account")) {
        setIdentifierError(t("notVerified"));
        setIsAccountVerified(false);
        // Store email securely only if account is not verified
        await SecureStore.setItemAsync("tempEmail", data.email);
      } else if (message.includes("Invalid")) {
        setPasswordError(t("wrongPassword"));
        setIdentifierError(null);
      } else {
        // Handle other errors if necessary
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (identifier) {
      if (identifier.includes("@")) {
        await SecureStore.setItemAsync("tempEmail", identifier);
      } else {
        await SecureStore.setItemAsync("tempUsername", identifier);
      }
      await SecureStore.setItemAsync("isFromLogin", "true");
      // Call resendOtpApi to send OTP
      const otpPayload = { identifier };
      await resendOtpApi(otpPayload);
      router.push("/(auth)/VerifyOtpScreen");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={pive} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.greeting}>{t("youAreBack")}</Text>
        <Text style={styles.welcomeText}>{t("loginToGift")}</Text>
        <View style={styles.input}>
          <Controller
            control={control}
            name="identifier" // Update the name to reflect dual purpose
            rules={{
              required: t("identifierRequired"),
              validate: {
                validFormat: (value) => {
                  // Email pattern
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  // Username pattern (3-20 characters, letters, numbers, underscore, hyphen)
                  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

                  if (emailRegex.test(value) || usernameRegex.test(value)) {
                    return true;
                  }
                  return t("invalidIdentifier");
                },
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <CustomInput
                  label={t("identifier")}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    setIdentifier(text);
                    if (text === "") {
                      setIsAccountVerified(true);
                      setIdentifierError(null);
                      setPasswordError(null);
                    }
                  }}
                  placeholder={t("enterIdentifier")}
                  variant={error || identifierError ? "error" : "default"}
                  errorText={error?.message || identifierError}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: t("passwordRequired"),
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View>
                <CustomInput
                  label={t("passwordLabel")}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("passwordPlaceholderLogin")}
                  isSecure={true}
                  variant={error || passwordError ? "error" : "default"}
                  errorText={error?.message || passwordError}
                />
              </View>
            )}
          />
          <View style={styles.forgotContainer}>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/ForgotPasswordScreen")}
              style={{ alignSelf: "center" }}
            >
              <Text style={styles.forgotText}>{t("forgotPassword")}</Text>
            </TouchableOpacity>
          </View>
          <CustomCTAButton
            onPress={
              isAccountVerified ? handleSubmit(onSubmit) : handleVerifyOtp
            }
            style={{ width: "100%" }}
            label={isAccountVerified ? t("login") : t("verifyOtp")}
          />

          <View style={styles.registerContainer}>
            {renderLoginText({ screen: "login" })}
          </View>
        </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: normalize("width", 20),
  },
  logoContainer: {
    height: normalize("height", 160),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize("height", 10),
  },
  logo: {
    width: normalize("width", 120),
    height: normalize("height", 120),
  },
  greeting: {
    color: "black",
    fontSize: normalize("font", 36),
    fontWeight: "bold",
    marginBottom: normalize("height", 8),
  },
  welcomeText: {
    color: colors.grey400,
    fontSize: normalize("font", 16),
    fontWeight: "400",
    marginBottom: normalize("height", 39),
  },
  input: {
    width: "100%",
    display: "flex",
    gap: normalize("vertical", 4),
  },
  register: {
    textAlign: "center",
    color: colors.grey400,
    fontSize: normalize("font", 14),
  },
  registerCTA: {
    textAlign: "center",
    color: colors.grey400,
    fontWeight: "700",
    fontSize: normalize("font", 14),
  },
  registerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: normalize("horizontal", 2),
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
  forgotContainer: {
    paddingBottom: normalize("vertical", 16),
    paddingTop: normalize("vertical", 8),
  },
  forgotText: {
    color: colors.grey400,
    textAlign: "center",

    fontSize: normalize("font", 14),
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 20,
  },
});

export default LoginScreen;
