import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import VendorsHeader from "./VendorsHeader";
import { VendorCard } from "./VendorCard";
import { normalize } from "@/src/theme/normalize";



const Vendors = () => {
  return (
    <View style={styles.container}>
      <VendorsHeader />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <VendorCard />
        <VendorCard />
        <VendorCard />
      </ScrollView>
    </View>
  );
};

export default Vendors;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollView: {
    flexGrow: 0,
    marginTop: normalize("vertical", 12),
    gap: 2, // Prevents the ScrollView from taking up extra space
  },
  scrollContent: {
    gap: normalize("horizontal", 12),
    paddingLeft: normalize("horizontal", 16), // 12-point gap between cards
  },
});
