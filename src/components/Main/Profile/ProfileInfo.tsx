import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import Avatar from "../../ui/Avatar/Avatar";
import { BadgeList, BadgeType } from "../../ui/Badges/Badge";
import People from "@/src/icons/main/People";

interface ProfileInfoProps {
  userData: {
    name: string;
    bioText: string;
    followers: number;
    memberSince: number;
    tag: string;
    bioCompletion: number;
  };
}
const userBadges: BadgeType[] = ["tea"];
const ProfileInfo = ({ userData }: ProfileInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Avatar uri="https://avatar.iran.liara.run/public/48" size={64} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.bioText}>{userData.bioText}</Text>
          <View style={styles.metaContainer}>
            <People color={colors.grey400} width={18} height={18} />
            <Text style={styles.metaText}>{userData.followers}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.metaText}>
              member since {userData.memberSince}
            </Text>
          </View>
          <View>
            <BadgeList badges={userBadges} />
          </View>
        </View>
      </View>
    {/*   <View style={styles.rightSection}>
        <Text style={styles.percentage}>{userData.bioCompletion}%</Text>
        <Text style={styles.addBio}>add bio</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: normalize("horizontal", 20),
    paddingVertical: normalize("vertical", 16),
  },
  leftSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  infoContainer: {
    marginLeft: normalize("horizontal", 12),
    flex: 1,
  },
  name: {
    fontSize: normalize("font", 16),
    fontWeight: "600",
    color: colors.grey700,
    marginBottom: normalize("vertical", 2),
  },
  bioText: {
    fontSize: normalize("font", 14),
    color: colors.grey700,
    marginBottom: normalize("vertical", 6),
    fontWeight: 500,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalize("vertical", 6),
  },
  metaText: {
    fontSize: normalize("font", 12),
    color: colors.grey400,
    marginLeft: normalize("horizontal", 4),
    fontWeight:400
  },
  separator: {
    marginHorizontal: normalize("horizontal", 6),
    color: colors.grey400,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8E5FF",
    paddingHorizontal: normalize("horizontal", 8),
    paddingVertical: normalize("vertical", 4),
    borderRadius: normalize("width", 12),
    alignSelf: "flex-start",
  },
  tagText: {
    fontSize: normalize("font", 11),
    color: "#6B5CE7",
    marginLeft: normalize("horizontal", 4),
    fontWeight: "600",
  },
  rightSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  percentage: {
    fontSize: normalize("font", 32),
    fontWeight: "700",
    color: "#1A1A1A",
  },
  addBio: {
    fontSize: normalize("font", 11),
    color: "#999",
    marginTop: normalize("vertical", 4),
  },
});
export default ProfileInfo;
