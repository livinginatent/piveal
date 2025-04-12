// File: app/(auth)/_layout.tsx

import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  // Sets up the Stack navigator for the auth flow
  return (
    <Stack
      screenOptions={{
        // Hide the header for all screens in the auth flow
        headerShown: false,
      }}
    />
    // Screens like welcome.tsx, sign-in.tsx, register.tsx
    // will be automatically nested within this Stack navigator
  );
}
