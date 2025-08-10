// File: app/_layout.tsx
import "react-native-gesture-handler";
import "@/src/i18n";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, View, StyleSheet, StatusBar } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { colors } from "@/src/theme/theme";
import LanguageSwitcher from "@/src/components/ui/LanguageSwitcher/LanguageSwitchers";

const InitialLayout = () => {
  const { isAuthenticated, isRegistered, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    // Only handle redirects here, not in other layouts
    if (!isAuthenticated && !inAuthGroup && !isRegistered) {
      router.replace("/(auth)/WelcomeScreen");
    } else if (isRegistered && !isAuthenticated && inAuthGroup) {
      router.replace("/(auth)/VerifyOtpScreen");
    } else if (isAuthenticated && inAuthGroup) {
      // If authenticated and in auth group, redirect to home
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar backgroundColor={colors.primaryBg} />
        <InitialLayout />
        <LanguageSwitcher />
      </AuthProvider>
    </GestureHandlerRootView>
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
