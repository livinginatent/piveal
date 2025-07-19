// File: app/(app)/_layout.tsx

import React from "react";
import { Stack, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native"; // Optional loading/safeguard
import { useAuth } from "../context/AuthContext";

export default function AppStackLayout() {
  // This defines the main stack navigator for the authenticated section
  return (
    <Stack
      screenOptions={
        {
          // Default options for screens in this stack (optional)
          // E.g., headerStyle: { backgroundColor: 'blue' }
        }
      }
    >
      {/* The Tab navigator is nested Screen within this stack */}
      <Stack.Screen
        name="(tabs)" // This refers to the directory name
        options={{
          headerShown: false, // Hide the header for the Tabs screen itself
        }}
      />
      {/* Define other screensModal in this stack */}
      <Stack.Screen
        name="modal"
        options={{
          // Configures this screen to be presented as a modal
          presentation: "modal",
          headerTitle: "Modal Screen",
        }}
      />
      {/* Add other stack screens here if needed */}
      {/* <Stack.Screen name="user-details" options={{ title: 'User Details' }} /> */}
    </Stack>
  );
}
