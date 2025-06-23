import type React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { normalize } from "@/app/theme/normalize";
import { loginApi, registerUser } from "@/app/api/authService";
import { Link, useRouter } from "expo-router";
import { CustomCTAButton } from "../components/ui/Buttons/CTAButton";
import { colors } from "@/app/theme/theme"; // Import colors
import { PhoneNumberInput } from "../components/ui/PhoneNumberInput/PhoneNumberInput";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { GoogleIcon } from "../src/icons/social/GoogleIcon";
import FacebookIcon from "../src/icons/social/FacebookIcon";
import AppleIcon from "../src/icons/social/AppleIcon";
import { CustomInput } from "../components/ui/Buttons/InputButton";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
type FormData = {
  phoneNumber: string;
  password: string;
};
export const LoginScreen: React.FC = () => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { phoneNumber: "", password: "" },
  });
  const router = useRouter();
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { login } = useAuth();

  const onSubmit = async (data: FormData) => {
    const loginPayload = {
      phoneNumber: data.phoneNumber,
      password: data.password,
    };
    try {
      const response = await loginApi(loginPayload);
      await login(response.accessToken, response.refreshToken);
      router.push({ pathname: "/(app)/(tabs)/home" });
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.response?.data?.error;
      console.log(message);
      if (message === "User not found.") {
        setPhoneError(t("userNotFound"));
        setPasswordError(null);
      } else if (message.includes("Account")) {
        setPhoneError("Hesab təsdiqlənməyib");
      } else if (message.includes("Invalid")) {
        setPasswordError(t("userNameTaken"));
        setPhoneError(null);
      } else {
      }
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
            name="phoneNumber"
            rules={{
              required: "Nömrə boş buraxıla bilməz",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Mobil nömrə təyin edək",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <PhoneNumberInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nömrəni yazmaq üçün"
                  error={!!error || !!phoneError} // Display error if there's an error or custom phone error
                  errorText={error?.message || phoneError}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View>
                <CustomInput
                  label="Yeni şifrə"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Şifrəni daxil et"
                  isSecure={true}
                  variant={error || passwordError ? "error" : "default"}
                  errorText={error?.message || passwordError}
                />
              </View>
            )}
          />
          <CustomCTAButton
            onPress={handleSubmit(onSubmit)}
            style={{ width: "100%" }}
            label="Daxil ol"
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
    paddingTop: normalize("height", 40),
  },
  logoContainer: {
    width: "100%",
    height: normalize("height", 160),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize("height", 48),
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
  loginButton: {
    width: "100%",
    marginBottom: normalize("height", 24),
  },
  registerButton: {
    width: "100%",
    marginBottom: normalize("height", 24),
  },
  testButton: {
    width: "100%",
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: normalize("height", 2) },
    shadowOpacity: 0.2,
    shadowRadius: normalize("width", 2),
  },
});

export default LoginScreen;
