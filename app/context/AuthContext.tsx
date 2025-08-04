// File: context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
  isAuthenticated: boolean;
  isRegistered: boolean;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, username: string) => void;
  verifyOtp: (email: string, otp: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  // centralize token storage
  const authenticate = async (accessToken: string, refreshToken: string) => {
await Promise.all([
  SecureStore.setItemAsync("access_token", accessToken),
  SecureStore.setItemAsync("refresh_token", refreshToken),
]);
    setIsAuthenticated(true);
  };

  const login = async (accessToken: string, refreshToken: string) => {
    try {
      await authenticate(accessToken, refreshToken);
    } catch (err) {
      // rethrow or handle
      throw err;
    }
  };

  const register = (email: string, username: string) => {
    console.log(`Registering user: ${email}, ${username}`);
    // Here, after the registration form, you can store user data or a token
    setIsRegistered(true); // Mark user as registered but not authenticated yet
    // You may want to save some user-related data in AsyncStorage
  };

  const verifyOtp = async (accessToken: string, refreshToken: string) => {
    try {
      // assume res = { accessToken, refreshToken, user }
      await authenticate(accessToken, refreshToken);
      setIsRegistered(false); // you’re now fully logged in
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
    setIsAuthenticated(false);
    setIsRegistered(false);
  };

  // on app start, check for token
  const checkAuth = async () => {
    const token = await SecureStore.getItemAsync("access_token");
    if (token) setIsAuthenticated(true);
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isRegistered,
        loading,
        login,
        logout,
        register,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
