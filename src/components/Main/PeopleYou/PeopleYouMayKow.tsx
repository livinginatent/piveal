import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import PeopleHeader from "./PeopleHeader";
import PeopleCard from "./PeopleCard";
import { normalize } from "@/src/theme/normalize";

const PeopleYouMayKnow = () => {
  return (
    <View style={styles.container}>
      <PeopleHeader />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <PeopleCard />
        <PeopleCard />
        <PeopleCard />
        <PeopleCard />
        <PeopleCard />
      </ScrollView>
    </View>
  );
};

export default PeopleYouMayKnow;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollView: {
    paddingHorizontal: normalize("horizontal", 16),
    marginTop: normalize("vertical", 12),

    // Optional: add some left padding
  },
  scrollContent: {
    gap: normalize("horizontal", 12), // 4px gap between cards
    // Optional: add some right padding so last card isn't cut off
  },
});
