import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { StyleSheet, Text } from "react-native";

type RenderLoginTextProps = {
  screen: "login" | "register";
};

// Function to render the login/register text with dynamic translation
export const renderLoginText = ({ screen }: RenderLoginTextProps) => {
  if (screen === "login") {
    const text = t("noAccount"); // e.g., "Don't have an account? {{register}}"
    const link = t("registerLink"); // e.g., "Sign up"
    const parts = text.split(/(\{\{register\}\})/);

    return (
      <Text style={styles.haveAccount}>
        {parts.map((part, index) => {
          if (part === "{{register}}") {
            return (
              <Text
                key={index}
                style={styles.loginLinkText}
                onPress={() => router.push("/(auth)/RegisterScreen")}
              >
                {link}
              </Text>
            );
          } else {
            return part;
          }
        })}
      </Text>
    );
  } else {
    const text = t("alreadyHaveAccount"); // e.g., "Already have an account? {{login}}"
    const link = t("loginLink"); // e.g., "Log in"
    const parts = text.split(/(\{\{login\}\})/);

    return (
      <Text style={styles.haveAccount}>
        {parts.map((part, index) => {
          if (part === "{{login}}") {
            return (
              <Text
                key={index}
                style={styles.loginLinkText}
                onPress={() => router.push("/(auth)/LoginScreen")}
              >
                {link}
              </Text>
            );
          } else {
            return part;
          }
        })}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  haveAccount: {
    fontWeight: "400",
    fontSize: normalize("font", 14),
    color: colors.grey400,
    textAlign: "center",
    marginTop: 24,
  },
  loginLinkText: {
    fontWeight: "bold",
    color: colors.grey400,
  },
});
