// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    // simulate saving token
    await AsyncStorage.setItem("auth_token", "dummy_token");
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("auth_token");
    setIsAuthenticated(false);
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

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
