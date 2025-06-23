// File: context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginApi, verifyOtpApi, RegisterPayload } from "../api/authService"; // your API wrappers

type AuthContextType = {
  isAuthenticated: boolean;
  isRegistered: boolean;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (phoneNumber: string, username: string) => void;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  // centralize token storage
  const authenticate = async (accessToken: string, refreshToken: string) => {
    await AsyncStorage.multiSet([
      ["access_token", accessToken],
      ["refresh_token", refreshToken],
    ]);
    setIsAuthenticated(true);
  };

  const login = async (phoneNumber: string, password: string) => {
    try {
      const res = await loginApi({ phoneNumber, password });
      // assume res = { accessToken, refreshToken, user }
      console.log(res)
      await authenticate(res.accessToken, res.refreshToken);
    } catch (err) {
      // rethrow or handle
      throw err;
    }
  };

  const register = (phoneNumber: string, username: string) => {
    console.log(`Registering user: ${phoneNumber}, ${username}`);
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
    const token = await AsyncStorage.getItem("access_token");
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
