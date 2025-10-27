import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import StatCard from "./StatCard";
import Location from "@/src/icons/main/Location";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";

interface Statistic {
  id: string;
  value: number;
  label: string;
  icon: string;
  color: string;
  iconColor: string;
}

interface StatisticsSectionProps {
  statistics: Statistic[];
}

const StatisticsSection = ({ statistics }: StatisticsSectionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Location
            color={colors.orangeText}
            width={normalize("width", 24)}
            height={normalize("height", 24)}
          />
          <Text style={styles.title}>Statistika</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Hamısına bax</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {statistics.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalize("horizontal", 16),
    paddingVertical: normalize("vertical", 16),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: normalize("vertical", 16),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: normalize("font", 20),
    fontWeight: "700",
    color: "#1A1A1A",
    marginLeft: 6,
  },
  viewAll: {
    fontSize: normalize("font", 14),
    color: colors.grey400,
    fontWeight: 400,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: normalize("width", 12),
  },
});

export default StatisticsSection;
