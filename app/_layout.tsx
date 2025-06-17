// File: app/_layout.tsx
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, View, StyleSheet, StatusBar } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { colors } from "./theme/theme";

const InitialLayout = () => {
  const { isAuthenticated, isRegistered, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    console.log(
      `loading: ${loading}, isAuthenticated: ${
        isAuthenticated ? "present" : "null"
      }, inAuthGroup: ${inAuthGroup}`
    );

    if (!isAuthenticated && !inAuthGroup && !isRegistered) {
      // If not authenticated or registered, redirect to WelcomeScreen
      console.log("Redirecting to auth welcome");
      router.replace("/(auth)/WelcomeScreen");
    } else if (isRegistered && !isAuthenticated && inAuthGroup) {
      // If registered but not authenticated, stay on OTP screen
      console.log("Redirecting to VerifyOtpScreen");
      router.replace("/(auth)/VerifyOtpScreen");
    } else if (isAuthenticated && !inAuthGroup) {
      // If authenticated and not in auth group, redirect to home
      console.log("Redirecting to app tabs home");
      router.replace("/(app)/(tabs)/home");
    }
  }, [isAuthenticated, isRegistered, segments, loading, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#999999" />
      </View>
    );
  }

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor={colors.primaryBg} />
      <InitialLayout />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
