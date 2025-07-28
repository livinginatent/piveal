import { normalize } from "@/app/theme/normalize";
import { colors } from "@/app/theme/theme";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// Function to render the login text with dynamic translation
export const renderLoginText = () => {
  const loginText = t("alreadyHaveAccount");
  const loginLink = t("loginLink");

  // Split the text by placeholder
  const parts = loginText.split(/(\{\{login\}\})/);

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
              {loginLink}
            </Text>
          );
        } else {
          return part;
        }
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  haveAccount: {
    fontWeight: 400,
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
