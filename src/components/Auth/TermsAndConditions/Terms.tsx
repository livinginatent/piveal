import { normalize } from '@/src/theme/normalize';
import { colors } from '@/src/theme/theme';
import { t } from 'i18next';
import React from 'react'
import {
  StyleSheet,
  Text,
 
} from "react-native";



  export const renderTermsText = () => {
    const termsText = t("termsText");
    const termsLink = t("termsLink");
    const privacyLink = t("privacyLink");

    // Split the text by placeholders
    const parts = termsText.split(/(\{\{terms\}\}|\{\{privacy\}\})/);

    return (
      <Text style={styles.termsText}>
        {parts.map((part, index) => {
          if (part === "{{terms}}") {
            return (
              <Text
                key={index}
                style={styles.linkText}
               /*  onPress={() => router.push("/(legal)/TermsScreen")} */
              >
                {termsLink}
              </Text>
            );
          } else if (part === "{{privacy}}") {
            return (
              <Text
                key={index}
                style={styles.linkText}
/*                 onPress={() => router.push("/(legal)/PrivacyScreen")}
 */              >
                {privacyLink}
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
  termsText: {
    fontWeight: 400,
    fontSize: normalize("font", 14),
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