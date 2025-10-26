import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { normalize } from "@/src/theme/normalize";

// Import your custom icons
import Beer from "@/src/icons/badges/Beer";
import Wine from "@/src/icons/badges/Wine";
import { colors } from "@/src/theme/theme";
import Cocktail from "@/src/icons/badges/Cocktail";
import New from "@/src/icons/badges/New";
import Tea from "@/src/icons/badges/Tea";

// Badge type definition
export type BadgeType = "beer" | "wine" | "cocktail" | "new" | "tea";

// Icon component type
type IconComponent = React.ComponentType<{ color: string }>;

// Badge configuration - all styling is predefined here
const BADGE_CONFIG: Record<
  BadgeType,
  {
    label: string;
    icon: IconComponent;
    color: string;
    backgroundColor: string;
  }
> = {
  beer: {
    label: "Pivə sevən",
    icon: Beer,
    color: colors.orangeText,
    backgroundColor: "#FDE1D3",
  },
  wine: {
    label: "Şərab",
    icon: Wine,
    color: "#F42525",
    backgroundColor: "#FDD3D3",
  },
  cocktail: {
    label: "Kokteyl",
    icon: Cocktail,
    color: "#10B981",
    backgroundColor: "#CFF1E6",
  },
  new: {
    label: "Təzə",
    icon: New,
    color: "#673AB7",
    backgroundColor: "#E1D8F1",
  },
  tea: {
    label: "Çayxor",
    icon: Tea,
    color: "#103DB9",
    backgroundColor: "#CFD8F1",
  },
};

interface BadgeProps {
  type: BadgeType;
}

const Badge: React.FC<BadgeProps> = ({ type }) => {
  const config = BADGE_CONFIG[type];
  const IconComponent = config.icon;

  return (
    <View
      style={[styles.container, { backgroundColor: config.backgroundColor }]}
    >
      <IconComponent color={config.color} />
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

// Badge List Component - accepts array of badge types from backend
interface BadgeListProps {
  badges: BadgeType[];
}

export const BadgeList: React.FC<BadgeListProps> = ({ badges }) => {
  return (
    <View style={styles.listContainer}>
      {badges.map((badgeType, index) => (
        <Badge key={`${badgeType}-${index}`} type={badgeType} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: normalize("vertical", 2),
    paddingHorizontal: normalize("horizontal", 12),
    gap: normalize("width", 6),
    borderRadius: normalize("width", 6),
    alignSelf: "flex-start",
    minHeight: normalize("height", 28),
  },
  text: {
    fontSize: normalize("font", 14),
    fontWeight: "500",
  },
  listContainer: {
    flexDirection: "column",
    gap: normalize("height", 12),
  },
});

export default Badge;
