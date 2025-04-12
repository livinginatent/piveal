import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { normalize } from "../theme/normalize";
import { borderRadius, colors } from "../theme/theme";
import { CustomTextInput } from "../components/ui/Buttons/InputButton";
import Entypo from "@expo/vector-icons/Entypo";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { CustomCTAButton } from "../components/ui/Buttons/CTAButton";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { GoogleIcon } from "../src/icons/social/GoogleIcon";
import FacebookIcon from "../src/icons/social/FacebookIcon";
import AppleIcon from "../src/icons/social/AppleIcon";
type FormData = {
  phoneNumber: string;
  password: string;
};

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { phoneNumber: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
    console.log("first");
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  const onError = (errors: any) => {
    console.log("Form Errors:", errors);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          {/* Logo and Titles */}
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/logo/pive.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.greeting}>Xoş gəldin!</Text>
          <Text style={styles.secondaryTitle}>
            Davam etmək üçün qeydiyyatı tamamlayaq
          </Text>

          {/* Input Fields managed by react-hook-form */}
          <View style={styles.inputContainer}>
            {/* Phone Number Input */}
            <Controller
              control={control}
              rules={{
                required: "Nömrə boş buraxıla bilməz",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Yalnız rəqəmlərdən ibarət olmalıdır",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View>
                  <CustomTextInput
                    style={[
                      styles.inputField,
                      error ? styles.inputError : null,
                    ]}
                    variant="outlined"
                    label="Nömrənizi yazın"
                    topLabel="Mobil"
                    inputType="numeric"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
              name="phoneNumber"
            />

            {/* Password Input */}
            <Controller
              control={control}
              rules={{
                required: "Şifrə boş buraxıla bilməz",
                minLength: {
                  value: 6,
                  message: "Şifrə ən az 6 simvol olmalıdır",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View>
                  <CustomTextInput
                    style={[
                      styles.inputField,
                      error ? styles.inputError : null,
                    ]}
                    variant="outlined"
                    label="Şifrə təyin edin"
                    topLabel="Yeni şifrə"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder=""
                    secureTextEntry={!showPassword}
                    rightIcon={
                      <TouchableOpacity
                        onPress={handleShowPassword}
                        style={styles.eyeIconContainer}
                      >
                        {showPassword ? (
                          <Entypo
                            name="eye"
                            size={normalize("font", 20)}
                            color={colors.orange500}
                          />
                        ) : (
                          <Entypo
                            name="eye-with-line"
                            size={normalize("font", 20)}
                            color={colors.orange500}
                          />
                        )}
                      </TouchableOpacity>
                    }
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
              name="password"
            />
          </View>

          <CustomCTAButton
            onPress={handleSubmit(onSubmit, onError)}
            style={[
              styles.inputField,
              {
                borderRadius: normalize("height", 12),
              },
            ]}
            variant="primary"
            label="BAŞLAYAQ!"
          />
          <Text style={styles.haveAccount}>Hesabın var? Giriş et</Text>
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
    paddingTop: normalize("height", 40),
    paddingBottom: normalize("height", 20),
  },
  logoContainer: {
    height: normalize("height", 160),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize("height", 32),
  },
  logo: {
    width: normalize("width", 120),
    height: normalize("height", 120),
  },
  greeting: {
    color: "black",
    fontSize: normalize("font", 32),
    fontWeight: "bold",
    marginBottom: normalize("height", 6),
  },
  secondaryTitle: {
    fontSize: normalize("font", 16),
    color: colors.grey400,
    textAlign: "center",
    marginBottom: normalize("height", 24),
  },
  inputContainer: {
    width: "100%",
    gap: normalize("height", 16),
    marginBottom: normalize("height", 24),
  },
  inputField: {
    width: "100%",
    borderRadius: normalize("width", 4),
  },
  inputError: {
    borderColor: colors.orange300,
  },
  errorText: {
    color: colors.orange300,
    fontSize: normalize("font", 12),
    marginTop: normalize("height", 4),
    alignSelf: "flex-start",
    paddingLeft: normalize("width", 4),
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
    width: normalize("width", 50),
    height: normalize("height", 50),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: normalize("width", 10),
    elevation: 3, // Add shadow for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: { width: 0, height: normalize("height", 2) },
    shadowOpacity: 0.2,
    shadowRadius: normalize("width", 2),
  },
});
