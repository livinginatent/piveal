import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import Avatar from "../../ui/Avatar/Avatar";
import Champagne from "@/src/icons/beer/Champagne";
import { t } from "i18next";
import { SendButton } from "../../ui/Buttons/SendButton";
import { Marquee } from "@animatereactnative/marquee";
type User = {
  username: string;
  email?: string;
  isVerified?: boolean;
};

const FriendCard = ({ username }: User) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <Avatar size={40} uri={"https://avatar.iran.liara.run/public/38"} />
          <View style={styles.leftInfo}>
            <Text style={styles.name}>{username}</Text>

            <Marquee  spacing={20} speed={0.6}>
              <Text style={styles.otherInfo}>
                Tomorrow • Loves Iced Tea • Loves UX/UI • Loves Cats • Plays
                Chess
              </Text>
            </Marquee>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <SendButton
            title={t("send")}
            icon={
              <Champagne
                width={normalize("width", 20)}
                height={normalize("height", 20)}
                color="white"
              />
            }
            onPress={() => null}
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
    marginTop: normalize("vertical", 12),
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
    gap: normalize("vertical", 8),
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
    gap: normalize("vertical", 2),
    maxWidth: normalize("width", 160), // LIMIT WIDTH HERE
    overflow: "hidden",
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
