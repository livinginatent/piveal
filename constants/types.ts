// src/navigation/types.ts (or wherever you define your navigation types)

import { ParamListBase } from "@react-navigation/native"; // For general purpose

// Define the Root Stack Params for your application
// This is the main type used by useNavigation, router, etc.
export type RootStackParamList = {
  // Auth Stack
  "(auth)/WelcomeScreen": undefined; // No parameters expected
  "(auth)/RegisterScreen": undefined;
  "(auth)/LoginScreen": undefined;
  "(auth)/VerifyOtpScreen": { phoneNumber: string }; // VerifyOtpScreen now expects a phoneNumber string
  // Add other auth routes as needed

  // App Tabs (assuming this is your authenticated main app)
  "(app)/(tabs)/home": undefined; // No parameters for home screen in tabs
  // Add other app tabs and non-tab app screens here
  // For example:
  // '(app)/ProfileScreen': { userId: string };
};

// This is important for useNavigation hook to know about your routes
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
