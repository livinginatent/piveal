import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import ProfileHeader from "@/src/components/Main/Profile/ProfileHeader";
import ProfileInfo from "@/src/components/Main/Profile/ProfileInfo";
import StatisticsSection from "@/src/components/Main/Profile/StatisticsSection";
import BottomTabs from "@/src/components/Main/Profile/BottomTabs";
import { colors } from "@/src/theme/theme";

const ProfileScreen = () => {
  const userData = {
    username: "@ aylalıfova",
    name: "Ayla Alifova",
    bioText: "bio text",
    followers: 265,
    memberSince: 2025,
    tag: "Trvs",
    bioCompletion: 53,
  };

  const statistics = [
    {
      id: "1",
      value: 28,
      label: "Drinks sent",
      icon: "arrow-up",
      color: "#FDD7D8",
      iconColor: "#FF6B6B",
    },
    {
      id: "2",
      value: 32,
      label: "Drinks received",
      icon: "heart",
      color: "#E5F2FF",
      iconColor: "#DCE8FE",
    },
    {
      id: "3",
      value: 17,
      label: "Drinks redeemed",
      icon: "check",
      color: "#D4F0DA",
      iconColor: "#4CAF50",
    },
    {
      id: "4",
      value: 15,
      label: "Pending redemption",
      icon: "arrow-down",
      color: "#F8E6CC",
      iconColor: "#FFA726",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader username={userData.username} />
        <ProfileInfo userData={userData} />
        <StatisticsSection statistics={statistics} />
        <BottomTabs activeTab="fav-drinks" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg,
  },
  scrollView: {
    flex: 1,
  },
});

export default ProfileScreen;
