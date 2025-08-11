import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import Avatar from "../../ui/Avatar/Avatar";
import Champagne from "@//src/icons/beer/Champagne";
import { SendButton } from "../../ui/Buttons/SendButton";
import { Marquee } from "@animatereactnative/marquee";
import Connect from "@//src/icons/main/Connect";


const PeopleCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <Avatar size={40} uri={"https://avatar.iran.liara.run/public/38"} />
          <View style={styles.leftInfo}>
            <Text style={styles.name}>Günay</Text>

            <Marquee spacing={20} speed={0.6}>
              <Text style={styles.otherInfo}>99 connects</Text>
            </Marquee>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <SendButton
            title={""}
            width={normalize("width", 32)}
            height={normalize("height", 32)}
            icon={
              <Champagne
                width={normalize("width", 20)}
                height={normalize("height", 20)}
                color="white"
              />
            }
            onPress={() => null}
          />
          <SendButton
            title={""}
            backgroundColor="transparent"
            textColor={colors.orangeText}
            borderColor={colors.orangeText}
            width={normalize("width", 32)}
            height={normalize("height", 32)}
            icon={
              <Connect
                width={normalize("width", 20)}
                height={normalize("height", 20)}
                color={colors.orangeText}
              />
            }
            onPress={() => null}
          />
        </View>
      </View>
    </View>
  );
};

export default PeopleCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between", // Add this to push content to opposite ends
    alignItems: "center", // Add this to center vertically
    borderWidth: 1,
    borderColor: colors.orangeText,
    borderRadius: 24,
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
