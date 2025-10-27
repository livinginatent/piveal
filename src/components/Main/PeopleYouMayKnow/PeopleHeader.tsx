import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { t } from "i18next";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import People from "@/src/icons/main/People";

const PeopleHeader = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Left Side: Text and Icon */}
      <View style={styles.leftContainer}>
        <People width={32} height={32} color={colors.orangeText}  />
        <Text style={styles.headerText}>{t("youMayKnow")} </Text>
      </View>

      {/* Right Side: Icon */}
      <View style={styles.rightContainer}>
        <Text style={styles.text}>{t("showAll")}</Text>
      </View>
    </View>
  );
};

export default PeopleHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: normalize("horizontal", 16), // Normalize horizontal padding
    height: normalize("height", 40), // Normalize height for responsiveness
    marginTop: normalize("vertical", 16),
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: normalize("vertical", 4),
  },
  headerText: {
    fontSize: normalize("font", 20), // Normalize font size for header text
    fontWeight: "600", // Font weight doesn't need to be normalized
    marginRight: normalize("horizontal", 4), // Normalize margin for consistent spacing
    color: colors.textPrimary, // Fixed color for "Welcome"
  },
  orangeText: {
    color: colors.orangeText,
    fontWeight: "bold", // Orange color for username or "guest"
  },
  rightContainer: {
    justifyContent: "flex-end",
  },
  iconPlaceholder: {
    width: normalize("width", 24), // Normalize icon width
    height: normalize("height", 24), // Normalize icon height
    backgroundColor: "#888", // Placeholder color
    borderRadius: normalize("width", 12), // Normalize border radius for circular icons
  },
  text: {
    fontSize: normalize("font", 14),
    fontWeight: "400",
    color: colors.grey400,
  },
});
