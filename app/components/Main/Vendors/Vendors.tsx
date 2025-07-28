import { StyleSheet, View } from "react-native";
import React from "react";
import VendorsHeader from "./VendorsHeader";


type Props = {};

const Vendors = (props: Props) => {
  return (
    <View style={styles.container}>
      <VendorsHeader/>
    </View>
  );
};

export default Vendors;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
