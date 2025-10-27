import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { normalize } from "@/src/theme/normalize";
import Location from "@/src/icons/main/Location";
import Champagne from "@/src/icons/beer/Champagne";
import Clock from "@/src/icons/main/Clock";
import { colors } from "@/src/theme/theme";

interface BottomTabsProps {
  activeTab: string;
}

const BottomTabs = ({ activeTab }: BottomTabsProps) => {
  const tabs = [
    { id: "fav-drinks", label: "Fav drinks", icon: "wine" },
    { id: "venues", label: "Venues", icon: "location" },
    { id: "history", label: "History", icon: "time" },
  ];
  const getIconComponent = (iconName: string,tabId:string) => {
    switch (iconName) {
      case "wine":
        return <Champagne width={24} height={24}  color={activeTab===tabId ? colors.orangeText : colors.grey400} />;

      case "location":
        return (
          <Location
            width={24}
            height={24}
            color={activeTab === tabId ? colors.orangeText : colors.grey400}
          />
        );
      case "time":
        return (
          <Clock
            width={24}
            height={24}
            color={activeTab === tabId ? colors.orangeText : colors.grey400}
          />
        );
      
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          activeOpacity={0.7}
        >
          {getIconComponent(tab.icon,tab.id)}
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
    paddingVertical: 4,
    marginHorizontal: normalize("horizontal", 16),
    marginVertical: normalize("vertical", 16),

    borderRadius: normalize("width", 16),
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: normalize("vertical", 8),
    marginLeft: normalize("vertical", 4),
    borderRadius: normalize("width", 12),
  },
  tabLabel: {
    fontSize: normalize("font", 14),
    color: "#999",
    marginLeft: 6,
    fontWeight: 600,
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
