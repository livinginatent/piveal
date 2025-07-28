import { StyleSheet, View } from "react-native";
import React from "react";
import SoonHeader from "./SoonHeader";
import FriendCard from "./FriendCard";

type Props = {};

const Soon = (props: Props) => {
  return (
    <View style={styles.container}>
      <SoonHeader />
      <FriendCard/>
    </View>
  );
};

export default Soon;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
