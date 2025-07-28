import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { normalize } from "@/app/theme/normalize";
import { colors } from "@/app/theme/theme";
import Avatar from "../../ui/Avatar/Avatar";
import { CustomCTAButton } from "../../ui/Buttons/CTAButton";
import Champagne from "@/app/src/icons/beer/Champagne";

type Props = {};

const FriendCard = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <Avatar size={32} uri={"https://avatar.iran.liara.run/public/38"} />
          <View style={styles.leftInfo}>
            <Text style={styles.name}>Günay</Text>
            <Text style={styles.otherInfo}>Tomorrow • Loves Iced Tea</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <CustomCTAButton
            style={{
              borderRadius: 50,
              width: normalize("width", 98),
              height: normalize("height", 40),
            }}
            label="Send"
            labelStyle={{ fontSize: normalize("font", 14),textAlign:'right' }}
            leftIcon={<Champagne color='white' />}
            alignContent="left"
          />
        </View>
      </View>
    </View>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: normalize("horizontal", 16),
    marginTop: normalize("vertical", 16),
    
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between", // Add this to push content to opposite ends
    alignItems: "center", // Add this to center vertically
    borderWidth: 1,
    borderColor: colors.orangeText,
    borderRadius: 24,
    width: "100%",
    
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Add this to take available space
    gap: normalize("vertical", 4),
    paddingVertical: normalize("vertical", 16),
    paddingHorizontal: normalize("horizontal", 8),
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize("vertical", 4),
    paddingVertical: normalize("vertical", 16),
    paddingHorizontal: normalize("horizontal", 8),
  },
  leftInfo: {
    flexDirection: "column",
    gap: normalize("vertical", 4),
  },
  name: {
    fontSize: normalize("font", 14),
    fontWeight: "700",
  },
  otherInfo: {
    fontSize: normalize("font", 16),
    fontWeight: "400",
    color: colors.grey400,
  },
});
