import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import Avatar from "../../ui/Avatar/Avatar";
import Champagne from "@//src/icons/beer/Champagne";
import { SendButton } from "../../ui/Buttons/SendButton";
import Connect from "@//src/icons/main/Connect";
import { sendFriendRequest } from "@/src/api/services/friendRequestService";
import { useFriendRequestModal } from "../../ui/Modals/useFriendRequestModal";
import { FriendRequestModal } from "../../ui/Modals/FriendRequestModal";

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
}) => {

   const {
     modalVisible,
     modalType,
     modalTitle,
     modalMessage,
     hideModal,
     showLoading,
     showSuccess,
     showError,
   } = useFriendRequestModal();

  const handleSendDrink = () => {
    onSendDrink?.(user.id);
  };

  const handleConnect = async () => {
    try {
      // Show loading modal
      showLoading("Sending Friend Request", "Please wait...");

      // Send the actual request - use debug version first
      const result = await sendFriendRequest(user.id, "Let's be friends!");

      console.log("✅ Frontend received result:", result);

      // If we get here, the request was successful
      showSuccess(
        "Request Sent!",
        "Your friend request has been sent successfully."
      );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("❌ Frontend caught error:", error);

      // Check if this is actually a success case
      if (
        error.message?.includes("Friend request created") ||
        error.status === 201 ||
        error.status === 200
      ) {
        console.log("Actually a success, showing success modal");
        showSuccess(
          "Request Sent!",
          "Your friend request has been sent successfully."
        );
        return;
      }

      // Show error modal based on the error type
      if (error.message?.includes("already exists")) {
        showError(
          "Request Already Sent",
          "You already have a pending friend request with this user."
        );
      } else if (error.message?.includes("already friends")) {
        showError("Already Friends", "You are already friends with this user.");
      } else if (error.message?.includes("not accepting")) {
        showError(
          "Cannot Send Request",
          "This user is not accepting friend requests."
        );
      } else {
        showError(
          "Failed to Send",
          error.message || "Something went wrong. Please try again."
        );
      }
    }
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
      {/* The reusable modal */}
      <FriendRequestModal
        visible={modalVisible}
        type={modalType}
        title={modalTitle}
        message={modalMessage}
        onClose={hideModal}
        autoClose={modalType !== "loading"}
        autoCloseDelay={3000}
      />
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
