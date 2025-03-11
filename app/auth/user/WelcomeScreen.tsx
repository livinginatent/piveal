import type React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { normalize } from "@/app/theme/normalize";
import { CustomInputButton } from "@/app/components/ui/Buttons/InputButton";
import { registerUser } from "@/app/api/authService";

export const LoginScreen: React.FC = () => {
  const handleLogin = () => {
    console.log("Login pressed");
  };

  const handleRegister = () => {
    console.log("Register pressed");
  };

  const handleTestRegister = async () => {
    try {
      const response = await registerUser({
        email: "test@example.com",
        username: "testuser",
        password: "test1234",
        dob: "2000-01-01",
      });
      console.log("Register API response:", response);
    } catch (error: any) {
      console.error("Register API error:", error);
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
        <Text style={styles.greeting}>Salam!</Text>
        <CustomInputButton
          label="Hesabıma gir"
          onPress={handleLogin}
          variant="filled"
          style={styles.loginButton}
        />
        <CustomInputButton
          label="Mən hələ təzəyəm"
          variant="outlined"
          onPress={handleRegister}
          style={styles.registerButton}
        />
        <CustomInputButton
          label="Test Register API"
          variant="outlined"
          onPress={handleTestRegister}
          style={styles.testButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
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
    color: "#ffffff",
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

export default LoginScreen;
