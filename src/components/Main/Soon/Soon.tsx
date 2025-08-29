import { StyleSheet, View } from "react-native";
import React from "react";
import SoonHeader from "./SoonHeader";
import FriendCard from "./FriendCard";

type User = {
  username: string;
  email?: string;
  isVerified?: boolean;
};

const Soon = ({ username }: User) => {
  return (
    <View style={styles.container}>
      <SoonHeader />
      <FriendCard username={username} />
    </View>
  );
};

export default Soon;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
