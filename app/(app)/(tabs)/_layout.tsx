// File: app/(app)/(tabs)/_layout.tsx

import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons"; // Example icon library

export default function TabLayout() {
  // Sets up the bottom tab navigator
  return (
    <Tabs
      screenOptions={({ route }) => ({
        // --- Icon Logic ---
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap; // Type checking for icon names

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else {
            iconName = "alert-circle"; // Default fallback
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // --- Styling and Behavior ---
        tabBarActiveTintColor: "dodgerblue", // Color for active tab
        tabBarInactiveTintColor: "gray", // Color for inactive tabs
        headerShown: true, // Show a header bar on screens within the tabs
        // Set to false if you want custom headers per screen
        // or no headers within tabs.
      })}
    >
      {/* Define each tab screen */}
      <Tabs.Screen
        name="home" // Corresponds to home.tsx
        options={{
          title: "Home", // Header title for the Home screen
          // tabBarLabel: 'Feed', // Optional: Custom label for the tab
        }}
      />
      <Tabs.Screen
        name="profile" // Corresponds to profile.tsx
        options={{
          title: "My Profile",
        }}
      />
      <Tabs.Screen
        name="settings" // Corresponds to settings.tsx
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
