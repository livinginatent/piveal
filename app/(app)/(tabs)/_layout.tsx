// File: app/(app)/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Calendar from "@/app/src/icons/main/Calendar";
import Champagne from "@/app/src/icons/beer/Champagne";
import { colors } from "@/app/theme/theme";
import Magnifying from "@/app/src/icons/main/Magnifying";
import User from "@/app/src/icons/main/User";
import { normalize } from "@/app/theme/normalize";

// You can create similar SVG components for other icons
// For now, using Calendar as example for all tabs
const HomeIcon = (props: any) => <Champagne {...props} />;
const SearchIcon = (props: any) => <Magnifying {...props} />;
const MyProfile = (props: any) => <User {...props} />;

export default function TabLayout() {
  // Sets up the bottom tab navigator
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          // --- Icon Logic ---
          tabBarIcon: ({ focused }) => {
            if (route.name === "home") {
              return (
                <HomeIcon
                  width={normalize("width", 26)}
                  height={normalize("height", 26)}
                  color={focused ? colors.orangeText : colors.grey200}
                />
              );
            } else if (route.name === "search") {
              return (
                <SearchIcon width={normalize('width',26)} height={normalize('height',26)}
                  color={focused ? colors.orangeText : colors.grey200}
                />
              );
            } /* else if (route.name === "settings") {
              return (
                <MyProfile
                  color={focused ? colors.orangeText : colors.grey200}
                />
              );
            } */ else {
              return (
                <MyProfile
                  width={normalize("width", 26)}
                  height={normalize("height", 26)}
                  color={focused ? colors.orangeText : colors.grey200}
                />
              ); // Default fallback
            }
          },
          // --- Styling and Behavior ---
          tabBarActiveTintColor: "dodgerblue", // Color for active tab
          tabBarInactiveTintColor: "gray", // Color for inactive tabs
          headerShown: false, // Show a header bar on screens within the tabs
          // Set to false if you want custom headers per screen
          // or no headers within tabs.
          tabBarShowLabel: false,
          tabBarStyle: {
            height: normalize("height", 80),
            paddingTop: normalize("vertical", 7),
          },
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
          name="search" // Corresponds to settings.tsx
          options={{
            title: "Search",
          }}
        />
        <Tabs.Screen
          name="profile" // Corresponds to profile.tsx
          options={{
            title: "My Profile",
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
