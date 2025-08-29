import Star from "@//src/icons/main/Star";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";



// Star Icon Component

export const VendorCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          {/* Property Image */}
          <ImageBackground
            source={{
              uri: "https://seabreeze.az/uploads/2023/08/28/32_DSC06255.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          >
            {/* GPS Status Icon */}
            <View style={styles.gpsIcon}>
              
            </View>

            {/* Going Home Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Endirimli</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Title and Price */}
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              Beerbasha
            </Text>
            <Text style={styles.price}>$20</Text>
          </View>

          {/* Rating and Details */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <Star width={20} height={20} color={colors.orangeText} />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
            <View style={styles.dot} />
            <Text style={styles.ratingText}>200m</Text>
          </View>

          {/* Additional Details */}
          <Text style={styles.details}>Sərin pivələr</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    width: normalize("width", 212),
    height: normalize("height", 204),
    backgroundColor: "white",
    borderRadius: normalize("width", 16),
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: normalize("height", 120),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gpsIcon: {
    position: "absolute",
    top: normalize("vertical", 16),
    right: normalize("horizontal", 48),
    width: normalize("width", 32),
    height: normalize("height", 32),
    backgroundColor: "white",
    borderRadius: normalize("width", 16),
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: normalize("vertical", 16),
    right: normalize("horizontal", 16),
    backgroundColor: "#F46A25",
    paddingHorizontal: normalize("horizontal", 16),
    paddingVertical: normalize("vertical", 8),
    borderRadius: normalize("width", 20),
  },
  badgeText: {
    color: "white",
    fontSize: normalize("width", 12),
    fontWeight: "bold",
  },
  content: {
    paddingVertical: normalize("width", 8),
    paddingHorizontal: 16,
    height: normalize("height", 84),
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: normalize("vertical", 4),
  },
  title: {
    color: "#252526",
    fontSize: normalize("width", 16),
    fontWeight: "600",
    lineHeight: normalize("height", 24),
    flex: 1,
    marginRight: normalize("horizontal", 8),
  },
  price: {
    color: "#636166",
    fontSize: normalize("width", 16),
    fontWeight: "500",
    lineHeight: normalize("height", 24),
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalize("vertical", 4),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: normalize("width", 4),
  },
  ratingText: {
    color: "#757575",
    fontSize: normalize("width", 14),
  },
  dot: {
    width: normalize("width", 4),
    height: normalize("height", 4),
    backgroundColor: "#757575",
    borderRadius: normalize("width", 2),
    marginHorizontal: normalize("horizontal", 8),
  },
  details: {
    color: "#636166",
    fontSize: normalize("width", 12),
    lineHeight: normalize("height", 16),
  },
});
