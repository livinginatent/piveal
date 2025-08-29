import { StyleSheet, Text, View } from "react-native";
import Cheers from "@/src/icons/beer/Cheers";
import { t } from "i18next";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import Notification from "@/src/icons/main/Notification";

type User = {
  username: string;
  email?: string;
  isVerified?: boolean;
};

const Header = ({username}:User) => {
  

  return (
    <View style={styles.headerContainer}>
      {/* Left Side: Text and Icon */}
      <View style={styles.leftContainer}>
        <Text style={styles.headerText}>
          {t("headerHi")},{" "}
          <Text style={styles.orangeText}>
            {username}
          </Text>
          !
        </Text>
        <Cheers/>
      </View>

      {/* Right Side: Icon */}
      <View style={styles.rightContainer}>
      <Notification/>
      </View>
    </View>
  );
};

export default Header;

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
  },
  headerText: {
    fontSize: normalize("font", 20), // Normalize font size for header text
    fontWeight: "400", // Font weight doesn't need to be normalized
    marginRight: normalize("horizontal", 4), // Normalize margin for consistent spacing
    color: "#000", // Fixed color for "Welcome"
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
});
