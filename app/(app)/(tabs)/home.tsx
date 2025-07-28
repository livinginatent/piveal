import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";
import Header from "@/app/components/ui/Header/Header";
import MainSend from "@/app/components/Main/SendBeer/MainSend";
import { colors } from "@/app/theme/theme";
import Soon from "@/app/components/Main/Soon/Soon";
import FriendCard from "@/app/components/Main/Soon/FriendCard";

// Mockup of your theme colors.
// You can continue to import this from "@/app/theme/theme".

export default function Home() {
  const { logout } = useAuth();

  // The logout handler remains available for the dev button.
  const handleDevLogout = async () => {
    Alert.alert(
      "Dev Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            await logout();
            router.replace("/(auth)/WelcomeScreen");
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    // SafeAreaView ensures your content avoids system UI like notches and the home indicator.
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* ====================================================================== */}
        {/* HEADER: This section can be consistent across all your screens.         */}
        {/* For a more advanced setup, consider creating a reusable Header component.*/}
        {/* ====================================================================== */}
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
        </View> */}
        <Header />

        {/* ====================================================================== */}
        {/* MAIN CONTENT: This ScrollView is where your page-specific content goes.*/}
        {/* ====================================================================== */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* --- START: PAGE-SPECIFIC CONTENT --- */}

          <MainSend />
          {/* --- END: PAGE-SPECIFIC CONTENT --- */}
          <Soon />
        </ScrollView>

        {/* ====================================================================== */}
        {/* DEV LOGOUT BUTTON: This remains for development builds.                */}
        {/* ====================================================================== */}
        {/* {__DEV__ && (
          <TouchableOpacity
            style={styles.devLogoutButton}
            onPress={handleDevLogout}
          >
            <Text style={styles.devLogoutButtonText}>DEV LOGOUT</Text>
          </TouchableOpacity>
        )} */}
      </View>
    </SafeAreaView>
  );
}

// ======================================================================
// STYLES: These styles define the foundational layout for your screens.
// ======================================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryBg, // Set a background color for the safe area
  },
  container: {
    position: "relative", // Required for the absolute positioning of the logout button
  },
  // Header Styles
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
  },
  // Main Content Styles
  contentContainer: {
    flexGrow: 1, // Allows the content to grow and enables scrolling
    justifyContent: "center", // Center content vertically for demonstration
    alignItems: "center", // Center content horizontally for demonstration
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.black,
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 18,
    textAlign: "center",
    color: colors.grey400,
  },
  // Dev Logout Button Styles
  devLogoutButton: {
    position: "absolute",
    top: 60, // Adjusted to be clearly visible below the status bar
    right: 20,
    backgroundColor: "rgba(255, 59, 48, 0.8)", // A standard iOS-like red with some transparency
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    zIndex: 9999, // Ensures it floats above all other content
  },
  devLogoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
