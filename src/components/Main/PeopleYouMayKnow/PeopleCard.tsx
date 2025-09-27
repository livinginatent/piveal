import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import Avatar from "../../ui/Avatar/Avatar";
import Champagne from "@//src/icons/beer/Champagne";
import { SendButton } from "../../ui/Buttons/SendButton";
import Connect from "@//src/icons/main/Connect";

type User = {
  id: number;
  username: string;
};

type PeopleCardProps = {
  user: User;
  onSendDrink?: (userId: number) => void;
  onConnect?: (userId: number) => void;
};

const PeopleCard: React.FC<PeopleCardProps> = ({
  user,
  onSendDrink,
  onConnect,
}) => {
  const handleSendDrink = () => {
    onSendDrink?.(user.id);
  };

  const handleConnect = () => {
    onConnect?.(user.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <Avatar size={40} uri="https://avatar.iran.liara.run/public/38" />
          <View style={styles.leftInfo}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {user.username}
            </Text>
            <Text style={styles.otherInfo}>99 connects</Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <SendButton
            title=""
            width={normalize("width", 32)}
            height={normalize("height", 32)}
            icon={
              <Champagne
                width={normalize("width", 20)}
                height={normalize("height", 20)}
                color="white"
              />
            }
            onPress={handleSendDrink}
          />
          <SendButton
            title=""
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
            onPress={handleConnect}
          />
        </View>
      </View>
    </View>
  );
};

export default PeopleCard;

const styles = StyleSheet.create({
  container: {
    // Remove redundant styles since content handles the layout
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.orangeText,
    borderRadius: 24,
    minWidth: normalize("width", 200), // Ensure consistent card width
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize("horizontal", 8), // Use horizontal for horizontal gap
    paddingVertical: normalize("vertical", 16),
    paddingLeft: normalize("horizontal", 12),
    flex: 1, // Take available space
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize("horizontal", 4), // Use horizontal for horizontal gap
    paddingVertical: normalize("vertical", 16),
    paddingRight: normalize("horizontal", 12),
  },
  leftInfo: {
    flexDirection: "column",
    gap: normalize("vertical", 2),
    flex: 1, // Take remaining space
    maxWidth: normalize("width", 120), // Adjust based on your needs
  },
  name: {
    fontSize: normalize("font", 14),
    fontWeight: "700",
  },
  otherInfo: {
    fontSize: normalize("font", 12), // Made smaller for secondary info
    fontWeight: "400",
    color: colors.grey400,
  },
});
