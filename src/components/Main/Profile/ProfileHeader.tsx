import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";

interface ProfileHeaderProps {
  username: string;
}

const ProfileHeader = ({ username }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color={colors.orangeText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: normalize("horizontal", 20),
    paddingVertical: normalize("vertical", 16),
  },
  username: {
    fontSize: normalize('font',20),
    fontWeight: "600",
    color: "#000000",
    
  },
});

export default ProfileHeader;
