import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Champagne from "@/src/icons/beer/Champagne";

import ArrowDown from "@/src/icons/main/ArrowDown";
import HeartOutlined from "@/src/icons/main/HeartOutlined";
import Check from "@/src/icons/main/Check";
import { normalize } from "@/src/theme/normalize";

interface StatCardProps {
  stat: {
    value: number;
    label: string;
    icon: string;
    color: string;
    iconColor: string;
  };
}

const StatCard = ({ stat }: StatCardProps) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "arrow-up":
        return <Champagne width={18} height={18} color="red" />;

      case "arrow-down":
        return <ArrowDown width={18} height={18} color="#DB8400" />;
      case "heart":
        return <HeartOutlined width={18} height={18} color="#518EF8" />;
      case "check":
        return <Check width={18} height={18} color="#28B446" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: stat.color }]}>
        {getIconComponent(stat.icon)}
      </View>
      <Text style={styles.value}>{stat.value}</Text>
      <Text style={styles.label}>{stat.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: normalize("width", 16),
    paddingVertical: normalize("vertical", 12),
    alignItems: "center",
  },
  iconContainer: {
    width: normalize("width", 40),
    height: normalize("width", 40),
    borderRadius: normalize("width", 20),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize("vertical", 12),
  },
  value: {
    fontSize: normalize("font", 18),
    fontWeight: "700",
    color: "#000",
    marginBottom: normalize("vertical", 4),
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    color: "#000",
    textAlign: "center",
    lineHeight: 16,
  },
});

export default StatCard;
