// File: app/_layout.tsx
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, View, StyleSheet, StatusBar } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "./theme/theme";

const InitialLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = (segments[0] as string) === "(auth)";

    console.log(
      `loading: ${loading}, isAuthenticated: ${
        isAuthenticated ? "present" : "null"
      }, inAuthGroup: ${inAuthGroup}`
    );

    if (!isAuthenticated && !inAuthGroup) {
      console.log("Redirecting to auth welcome");
      // --- CORRECTED PATH ---
      router.replace("/(auth)/WelcomeScreen");
    } else if (isAuthenticated && inAuthGroup) {
      console.log("Redirecting to app tabs home");
      // --- CORRECTED PATH (assuming filename is home.tsx) ---
      router.replace("/(app)/(tabs)/home");
    }
  }, [isAuthenticated, segments, loading, router]);

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
      <StatusBar backgroundColor={colors.primaryBg}  />
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
