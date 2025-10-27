/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import Avatar from "../../ui/Avatar/Avatar";
import Champagne from "@//src/icons/beer/Champagne";
import { SendButton } from "../../ui/Buttons/SendButton";
import Connect from "@//src/icons/main/Connect";
import { sendFriendRequest } from "@/src/api/services/friendRequestService";

type User = {
  id: number;
  username: string;
};

type PeopleCardProps = {
  user: User;
  onSendDrink?: (userId: number) => void;
  onConnect?: (userId: number) => void;
};

const PeopleCard: React.FC<PeopleCardProps> = ({ user, onSendDrink }) => {
  const handleSendDrink = () => {
    onSendDrink?.(user.id);
  };

  const handleConnect = async () => {
    try {
      const result = await sendFriendRequest(user.id, "Let's be friends!");

      console.log("✅ Frontend received result:", result);
    } catch (error: any) {
      console.log("❌ Frontend caught error:", error);

      if (
        error.message?.includes("Friend request created") ||
        error.status === 201 ||
        error.status === 200
      ) {
        console.log("Actually a success, showing success modal");

        return;
      }

      if (error.message?.includes("already exists")) {
      } else if (error.message?.includes("already friends")) {
      } else if (error.message?.includes("not accepting")) {
      }
    }
  };

  return (
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
          height={normalize("width", 32)}
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
          height={normalize("width", 32)}
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
  );
};

export default PeopleCard;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.orangeText,
    borderRadius: 24,
    minWidth: normalize("width", 200),
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize("horizontal", 8),
    paddingVertical: normalize("vertical", 16),
    paddingLeft: normalize("horizontal", 12),
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize("horizontal", 4),
    paddingVertical: normalize("vertical", 16),
    paddingRight: normalize("horizontal", 12),
  },
  leftInfo: {
    flexDirection: "column",
    gap: normalize("vertical", 2),
    flex: 1,
    maxWidth: normalize("width", 120),
  },
  name: {
    fontSize: normalize("font", 14),
    fontWeight: "700",
  },
  otherInfo: {
    fontSize: normalize("font", 12),
    fontWeight: "400",
    color: colors.grey400,
  },
});
