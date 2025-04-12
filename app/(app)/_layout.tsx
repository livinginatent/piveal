// File: app/(app)/_layout.tsx

import React from "react";
import { Stack, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native"; // Optional loading/safeguard
import { useAuth } from "../context/AuthContext";

export default function AppStackLayout() {
  const { loading, isAuthenticated } = useAuth();

  // Optional: Add loading indicator or safeguard redirect, though root handles primary logic
  if (loading) {
    // You might want a loading indicator specific to the app section
    // return <ActivityIndicator />;
  }
  if (!isAuthenticated) {
    console.log("App stack layout redirecting to auth because no token found.");
    // Ensure users can't reach this layout if not logged in
    return <Redirect href="/(auth)/WelcomeScreen" />;
  }

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
