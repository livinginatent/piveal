import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import i18n from "i18next";

const LanguageSwitcher = () => {
  const currentLanguage = i18n.language;

  const languages = [
    { code: "az", label: "AZ" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
  ];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lang:</Text>
      <View style={styles.languageContainer}>
        {languages.map((language, index) => (
          <React.Fragment key={language.code}>
            <TouchableOpacity
              onPress={() => changeLanguage(language.code)}
              style={[
                styles.languageButton,
                currentLanguage === language.code && styles.activeLanguage,
              ]}
            >
              <Text
                style={[
                  styles.languageText,
                  currentLanguage === language.code &&
                    styles.activeLanguageText,
                ]}
              >
                {language.label}
              </Text>
            </TouchableOpacity>
            {index < languages.length - 1 && (
              <Text style={styles.separator}>|</Text>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginRight: 8,
    fontWeight: "500",
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeLanguage: {
    backgroundColor: "rgba(255, 165, 0, 0.2)",
  },
  languageText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  activeLanguageText: {
    color: "#ff6b00",
  },
  separator: {
    fontSize: 12,
    color: "#666",
    marginHorizontal: 4,
  },
});

export default LanguageSwitcher;
