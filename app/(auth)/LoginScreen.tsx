/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { normalize } from "@/app/theme/normalize";
import { loginApi, resendOtpApi } from "@/app/api/authService";
import { Link, useRouter } from "expo-router";
import { CustomCTAButton } from "../components/ui/Buttons/CTAButton";
import { colors } from "@/app/theme/theme";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { GoogleIcon } from "../src/icons/social/GoogleIcon";
import FacebookIcon from "../src/icons/social/FacebookIcon";
import AppleIcon from "../src/icons/social/AppleIcon";
import { CustomInput } from "../components/ui/Buttons/InputButton";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
/* import { useUserStore } from "../store/userStore";
 */
type FormData = {
  emailOrUsername: string;
  password: string;
  email: string;
};

export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
/*   const { setUser } = useUserStore.getState();
 */  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { emailOrUsername: "", password: "" },
  });
  const router = useRouter();
  const [emailOrUsernameError, setEmailOrUsernameError] = useState<
    string | null
  >(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isAccountVerified, setIsAccountVerified] = useState<boolean>(true); // Track account verification status
  const [emailOrUsername, setEmailOrUsername] = useState<string | null>(null);

  const { login } = useAuth();

  const onSubmit = async (data: FormData) => {
    const loginPayload = {
      emailOrUsername: data.emailOrUsername,
      password: data.password,
    };
    try {
      const response = await loginApi(loginPayload);
      if (response.user.isVerified) {
        await login(response.accessToken, response.refreshToken);
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
     /*    setUser({
          username: response.user.username,
          email: response.user.email,
        }); */
        router.push("/(app)/(tabs)/home");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.response?.data?.error;
      if (message === "User not found.") {
        setEmailOrUsernameError(t("userNotFound"));
        setPasswordError(null);
      } else if (message.includes("Account")) {
        setEmailOrUsernameError(t("notVerified"));
        setIsAccountVerified(false);
        // Store phone number only if account is not verified
        await AsyncStorage.setItem("tempEmail", data.email);
      } else if (message.includes("Invalid")) {
        setPasswordError(t("wrongPassword"));
        setEmailOrUsernameError(null);
      } else {
        // Handle other errors if necessary
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (emailOrUsername) {
      if (emailOrUsername.includes("@")) {
        await AsyncStorage.setItem("tempEmail", emailOrUsername);
      } else {
        await AsyncStorage.setItem("tempUsername", emailOrUsername);
      }
      await AsyncStorage.setItem("isFromLogin", "true");
      // Call resendOtpApi to send OTP
      const otpPayload = { emailOrUsername };
      await resendOtpApi(otpPayload);
      router.push("/(auth)/VerifyOtpScreen");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo/pive.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.greeting}>Sən qayıtdın!</Text>
        <Text style={styles.welcomeText}>Pivə almaq üçün daxil ol</Text>
        <View style={styles.input}>
          <Controller
            control={control}
            name="emailOrUsername" // Update the name to reflect dual purpose
            rules={{
              required: t("emailOrUsernameRequired"),
              validate: {
                validFormat: (value) => {
                  // Email pattern
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  // Username pattern (3-20 characters, letters, numbers, underscore, hyphen)
                  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

                  if (emailRegex.test(value) || usernameRegex.test(value)) {
                    return true;
                  }
                  return t("invalidEmailOrUsername");
                },
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <CustomInput
                  label={t("emailOrUsername")}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    setEmailOrUsername(text);
                    if (text === "") {
                      setIsAccountVerified(true);
                      setEmailOrUsernameError(null);
                      setPasswordError(null);
                    }
                  }}
                  placeholder={t("enterEmailOrUsername")}
                  variant={error || emailOrUsernameError ? "error" : "default"}
                  errorText={error?.message || emailOrUsernameError}
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
          <CustomCTAButton
            onPress={
              isAccountVerified ? handleSubmit(onSubmit) : handleVerifyOtp
            }
            style={{ width: "100%" }}
            label={isAccountVerified ? t("login") : t("verifyOtp")}
          />

          <View style={styles.registerContainer}>
            <Text style={styles.register}>Hesabın yoxdur?</Text>
            <Link href={"/(auth)/RegisterScreen"}>
              <Text style={styles.registerCTA}>Yaradaq!</Text>
            </Link>
          </View>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>və ya</Text>
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
    marginTop: normalize("vertical", 24),
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
    width: normalize("width", 50),
    height: normalize("height", 50),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: normalize("width", 10),
  },
});

export default LoginScreen;
