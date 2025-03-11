import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function TabsLayout() {
  const { isAuthenticated } = useAuth();

  // Protect the tabs route
  if (!isAuthenticated) {
    return <Redirect href="/auth/user/WelcomeScreen" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
