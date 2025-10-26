import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { normalize } from "@/src/theme/normalize";

interface BottomTabsProps {
  activeTab: string;
}

const BottomTabs = ({ activeTab }: BottomTabsProps) => {
  const tabs = [
    { id: "fav-drinks", label: "Fav drinks", icon: "wine" },
    { id: "venues", label: "Venues", icon: "location" },
    { id: "history", label: "History", icon: "time" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          activeOpacity={0.7}
        >
          <Ionicons
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            name={tab.icon as any}
            size={20}
            color={activeTab === tab.id ? "#FF6B35" : "#999"}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.id && styles.activeTabLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F3EFF8",
    paddingVertical: 12,
    marginHorizontal: normalize("horizontal", 16),
    marginVertical: normalize("vertical", 16),

    borderRadius: normalize("width", 16),
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: normalize("width", 12),
  },
  tabLabel: {
    fontSize: 13,
    color: "#999",
    marginLeft: 6,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
  },
  activeTabLabel: {
    color: "#FF6B35",
    fontWeight: "600",
  },
});

export default BottomTabs;
