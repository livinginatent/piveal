import {
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router, useRouter } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";
import { colors } from "@/app/theme/theme";

export default function Home() {
  const { logout } = useAuth();

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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>
      <Text style={styles.subtitle}>You are now logged in.</Text>

      {/* DEV LOGOUT BUTTON (Only for development) */}
      {__DEV__ && ( // __DEV__ ensures this only appears in development builds
        <TouchableOpacity
          style={styles.devLogoutButton}
          onPress={handleDevLogout}
        >
          <Text style={styles.devLogoutButtonText}>DEV LOGOUT</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryBg,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.black,
  },
  subtitle: {
    fontSize: 18,
    color: colors.black,
  },
  devLogoutButton: {
    position: "absolute",
    top: 50, // Adjust position as needed
    right: 20, // Adjust position as needed
    backgroundColor: "red", // Make it stand out in dev
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  devLogoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
