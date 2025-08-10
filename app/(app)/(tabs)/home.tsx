import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import { useEffect, useState } from "react";

import Champagne from "@/src/icons/beer/Champagne";
import { t } from "i18next";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/src/context/AuthContext";
import { Header } from "react-native/Libraries/NewAppScreen";
import MainSend from "@/src/components/Main/SendBeer/MainSend";
import Soon from "@/src/components/Main/Soon/Soon";
import Vendors from "@/src/components/Main/Vendors/Vendors";
import PeopleYouMayKnow from "@/src/components/Main/PeopleYou/PeopleYouMayKow";
import { CustomCTAButton } from "@/src/components/ui/Buttons/CTAButton";
import { normalize } from "@/src/theme/normalize";
import { colors } from "@/src/theme/theme";

type User = {
  username: string;
  email: string;
  isVerified: boolean;
};

export default function Home() {
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const loggedUser = await SecureStore.getItemAsync("user");
        if (loggedUser) {
          console.log(loggedUser);
          setUser(JSON.parse(loggedUser)); // Parse string to object
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUser(); // Call the function on component mount
  }, []);

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

  const handleFixedButtonPress = () => {
    // Add your button action here
    console.log("Fixed button pressed!");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header username={user ? user.username : "guest"} />

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}
        >
          <MainSend />
          <Soon username={user ? user.username : "guest"} />
          <Vendors />
          <PeopleYouMayKnow />
        </ScrollView>

        {/* Fixed Button Above Tab Bar */}
        <View style={styles.fixedButtonContainer}>
          <CustomCTAButton
            label={t("sendGift")}
            variant="primary"
            size="large"
            leftIcon={<Champagne color="white" />}
            style={{ width: normalize("width", 184), borderRadius: 16 }}
            onPress={handleFixedButtonPress}
            alignContent="grouped"
          />
        </View>

        {/* Dev Logout Button */}
        {__DEV__ && (
          <TouchableOpacity
            style={styles.devLogoutButton}
            onPress={handleDevLogout}
          >
            <Text style={styles.devLogoutButtonText}>DEV LOGOUT</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryBg,
  },
  container: {
    position: "relative",
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100, // Add padding to prevent content from being hidden behind fixed button
  },
  // Fixed Button Container Styles
  fixedButtonContainer: {
    position: "absolute",
    bottom: normalize("vertical", 24), // Adjust this value based on your tab bar height
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1000,
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
    top: 60,
    right: 20,
    backgroundColor: "rgba(255, 59, 48, 0.8)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    zIndex: 9999,
  },
  devLogoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
