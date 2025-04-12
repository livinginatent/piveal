import { Image, StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { normalize } from "../theme/normalize";
import { colors } from "../theme/theme";
import { CustomTextInput } from "../components/ui/Buttons/InputButton";
import Entypo from "@expo/vector-icons/Entypo";

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
    console.log('first')
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  const onError = (errors: any) => {
    console.log("Form Errors:", errors);
  };

  return (
    <SafeAreaView style={styles.container}>
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
                  style={[styles.inputField, error ? styles.inputError : null]}
                  variant="outlined"
                  label="Nömrənizi yazın"
                  topLabel="Mobil"
                  inputType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="050 123 45 67"
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
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
                  style={[styles.inputField, error ? styles.inputError : null]}
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
                          color={colors.grey500}
                        />
                      ) : (
                        <Entypo
                          name="eye-with-line"
                          size={normalize("font", 20)}
                          color={colors.grey500}
                        />
                      )}
                    </TouchableOpacity>
                  }
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
            name="password"
          />
        </View>

        {/* Submit Button */}
        <Pressable
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit, onError)}
        >
          <Text style={styles.submitButtonText}>Qeydiyyatı Tamamla</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    borderRadius: 4,
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
    borderRadius: 4,
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
});
