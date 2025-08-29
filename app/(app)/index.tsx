import { useAuth } from "@/src/context/AuthContext";
import { Redirect } from "expo-router";


export default function Index() {
  const { isAuthenticated } = useAuth();



  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/WelcomeScreen" />;
}
