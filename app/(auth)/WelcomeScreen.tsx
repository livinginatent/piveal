import type React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { normalize } from "@/app/theme/normalize";
import { registerUser } from "@/app/api/authService";
import { useRouter } from "expo-router";
import { CustomCTAButton } from "../components/ui/Buttons/CTAButton";
import { colors } from "@/app/theme/theme"; // Import colors
import { useTranslation } from "react-i18next";

export const WelcomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/(auth)/LoginScreen");
  };

  const handleRegister = () => {
    router.push("/(auth)/RegisterScreen");
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
        <Text style={styles.greeting}>{t("heyThere!")}</Text>
        <CustomCTAButton
          label={t("login")}
          onPress={handleLogin}
          variant="primary"
          style={styles.loginButton}
        />
        <CustomCTAButton
          label={t("register")}
          variant="outlined"
          onPress={handleRegister}
          style={styles.registerButton}
          size="large"
        />
        {/*  <CustomInputButton
          label="Test Register API"
          variant="outlined"
          onPress={handleTestRegister}
          style={styles.testButton}
        /> */}
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
    marginBottom: normalize("height", 64),
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
});

export default WelcomeScreen;
