/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Avatar = ({ uri, size }: any) => {
  const avatarSize = size || 36; // Default size if not provided

  return (
    <View
      style={[
        styles.avatarContainer,
        { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 },
      ]}
    >
      <Image source={{ uri: uri }} style={styles.avatarImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    overflow: "hidden", // Ensures the image is clipped to the border radius
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Ensures the image covers the entire area without distortion
  },
});

export default Avatar;
