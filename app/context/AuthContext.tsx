// File: context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isAuthenticated: boolean;
  isRegistered: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
  register: (phoneNumber: string, username: string) => void;
  verifyOtp: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isRegistered: false,
  login: () => {},
  logout: () => {},
  loading: true,
  register: () => {},
  verifyOtp: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // User registration state
  const [loading, setLoading] = useState(true);

  const login = async () => {
    await AsyncStorage.setItem("auth_token", "dummy_token");
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    setIsRegistered(false); // Also clear registration status on logout
  };

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (token) setIsAuthenticated(true);
    } catch (e) {
      console.error("Auth check error", e);
    } finally {
      setLoading(false);
    }
  };

  const register = (phoneNumber: string, username: string) => {
    console.log(`Registering user: ${phoneNumber}, ${username}`);
    // Here, after the registration form, you can store user data or a token
    setIsRegistered(true); // Mark user as registered but not authenticated yet
    // You may want to save some user-related data in AsyncStorage
  };

  const verifyOtp = () => {
    // After OTP verification, mark the user as authenticated
    setIsAuthenticated(true);
    // Optionally store a token or flag to keep them authenticated
    AsyncStorage.setItem("auth_token", "dummy_token"); // Store token
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isRegistered,
        login,
        logout,
        loading,
        register,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
