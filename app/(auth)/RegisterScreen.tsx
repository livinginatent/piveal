import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { normalize } from "../theme/normalize";
import { colors } from "../theme/theme";
import { CustomInput } from "../components/ui/Buttons/InputButton";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { CustomCTAButton } from "../components/ui/Buttons/CTAButton";
import { GoogleIcon } from "../src/icons/social/GoogleIcon";
import FacebookIcon from "../src/icons/social/FacebookIcon";
import AppleIcon from "../src/icons/social/AppleIcon";
import { registerUser } from "../api/authService";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useTranslation } from "react-i18next";
import { renderTermsText } from "../components/TermsAndConditions/Terms";
import { renderLoginText } from "../components/HaveAccount/HaveAccount";

// THIS SCREEN IS RESPONSIBLE FOR USER REGISTRATION. USERS NEED TO PICK A DATE TO CONFIRM THEY ARE 18 OR OLDER. USERS THEN
// ENTER THEIR PHONE NUMBER AND PASSWORD

type FormData = {
  email: string;
  password: string;
  username: string;
};
const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
  });
  const { t } = useTranslation();
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isUsernameStep, setIsUsernameStep] = useState(false); // New state for controlling the flow

  const onSubmit = async (data: FormData) => {
    if (isUsernameStep) {
      const registrationPayload = {
        email: data.email,
        password: data.password,
        username: data.username, // Add username from the input
      };
      try {
        await registerUser(registrationPayload);
        await AsyncStorage.setItem("tempEmail", data.email);
        router.push("/(auth)/VerifyOtpScreen");
      } catch (error: any) {
        const message =
          error.response?.data?.message || error.response?.data?.error;

        if (message.includes("Email")) {
          setEmailError(t("emailTaken"));
          setUsernameError(null);
        } else if (message.includes("Username")) {
          setUsernameError(t("userNameTaken"));
          setEmailError(null);
        } else {
          setEmailError(null);
          setUsernameError(t(message));
        }
      }
    } else {
      // Move to the username step
      setIsUsernameStep(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/logo/pive.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.greeting}>{t("welcome")}</Text>
          <Text style={styles.greetingLabel}>{t("greetingLabel")}</Text>

          {/* Registration Form Fields */}
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: t("mustEnterEmail"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("inputEmail"),
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <CustomInput
                    label={t("emailLabel")}
                    value={value}
                    onChangeText={onChange}
                    placeholder={t("emailPlaceholder")}
                    variant={error || emailError ? "error" : "default"}
                    errorText={error?.message || emailError}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
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
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View>
                  <CustomInput
                    label={t("passwordLabel")}
                    value={value}
                    onChangeText={onChange}
                    placeholder={t("passwordPlaceholder")}
                    isSecure={true}
                    variant={error ? "error" : "default"}
                    errorText={error?.message}
                  />
                </View>
              )}
            />
          </View>

          {/* Conditionally Render Username Input */}
          {isUsernameStep && (
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: t("nameCannotBeEmpty"),
                  minLength: {
                    value: 3,
                    message: t("min3CharsInUserName"),
                  },
                  maxLength: {
                    value: 12,
                    message: t("userNameMaxLengthMessage"),
                  },
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <View>
                    <CustomInput
                      label={t("usernameLabel")}
                      value={value}
                      onChangeText={onChange}
                      placeholder={t("usernamePlaceholder")}
                      variant={error || usernameError ? "error" : "default"}
                      errorText={error?.message || usernameError}
                    />
                  </View>
                )}
              />
            </View>
          )}

          <CustomCTAButton
            onPress={handleSubmit(onSubmit)}
            style={[
              styles.inputField,
              {
                borderRadius: normalize("height", 12),
              },
            ]}
            variant="primary"
            label={t(isUsernameStep ? "registerButton" : "letsStartButton")}
          />

          {/* <TouchableOpacity onPress={() => router.push("/(auth)/LoginScreen")}>
            <Text style={styles.haveAccount}>{t("alreadyHaveAnAccount")}</Text>
          </TouchableOpacity> */}
          {renderLoginText()}

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
          {renderTermsText()}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    fontSize: normalize("font", 32),
    fontWeight: "bold",
    marginBottom: normalize("height", 4),
  },
  secondaryTitle: {
    fontSize: normalize("font", 16),
    color: colors.grey400,
    textAlign: "center",
    marginBottom: normalize("height", 24),
  },
  inputContainer: {
    width: "100%",
    gap: normalize("height", 4),
  },
  inputField: {
    width: "100%",
    borderRadius: normalize("width", 4),
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },
  errorText: {
    color: colors.error,
    fontSize: normalize("font", 12),
    alignSelf: "flex-start",
    paddingLeft: normalize("width", 2),
  },
  submitButton: {
    width: "100%",
    backgroundColor: colors.orange500,
    paddingVertical: normalize("height", 16),
    borderRadius: normalize("width", 4),
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize("height", 10),
  },
  submitButtonText: {
    color: colors.white,
    fontSize: normalize("font", 16),
    fontWeight: "bold",
  },
  eyeIconContainer: {
    padding: normalize("width", 4),
  },
  haveAccount: {
    color: colors.grey400,
    fontSize: normalize("font", 14),
    fontWeight: "400",
    marginTop: normalize("height", 24),
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: normalize("vertical", 24),
    marginBottom: normalize("vertical", 24),
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
    gap: normalize("vertical", 24),
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
  datePickerWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {
    marginTop: normalize("height", 16),
    width: "100%",
    borderRadius: normalize("height", 12),
  },
  pickDate: {
    fontSize: normalize("font", 16),
    fontWeight: "400",
  },

  dateInputField: {
    width: "100%",
    borderRadius: normalize("width", 4),
    maxHeight: normalize("height", 68),
    minHeight: normalize("height", 65),

    paddingVertical: normalize("height", 12),
    paddingHorizontal: normalize("width", 16),
    borderWidth: 1.5,
    backgroundColor: colors.white,
    justifyContent: "center",
    borderColor: colors.orange500,
  },

  birthDateText: {
    fontWeight: 500,
    fontSize: normalize("font", 18),
    color: colors.orange500,
  },
  errorBirthDateText: {
    color: colors.error,
    fontWeight: 500,
    fontSize: normalize("font", 18),
  },
  greetingLabel: {
    fontWeight: 400,
    fontSize: normalize("font", 16),
    color: colors.grey400,
    marginBottom: normalize("vertical", 24),
  },
  termsText: {
    fontWeight: 400,
    fontSize: normalize("font", 12),
    color: colors.grey400,
    textAlign: "center",
    marginTop: 24,
  },
  alreadyHave: {
    fontWeight: 700,
    fontSize: normalize("font", 12),
    color: colors.grey400,
    textAlign: "center",
    marginTop: 24,
  },
  linkText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: colors.grey400,
  },
});
