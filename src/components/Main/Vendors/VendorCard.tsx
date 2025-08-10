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
  container: {
    paddingHorizontal: normalize("horizontal", 16),

    
  },
  card: {
    width: normalize("width", 212),
    height: normalize("height", 204),
    backgroundColor: "white",
    borderRadius: 6,

    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gpsIcon: {
    position: "absolute",
    top: 16,
    right: 48,
    width: 32,
    height: 32,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#F46A25",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
    height: 84,
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  title: {
    color: "#252526",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    flex: 1,
    marginRight: 8,
  },
  price: {
    color: "#636166",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: "#757575",
    fontSize: 14,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: "#757575",
    borderRadius: 2,
    marginHorizontal: 8,
  },
  details: {
    color: "#636166",
    fontSize: 12,
    lineHeight: 16,
  },
});
