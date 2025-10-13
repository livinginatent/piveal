// File: context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode"; // Install: npm install jwt-decode

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

  // Validate if token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Token decode error:", error);
      return true; // If we can't decode it, treat as expired
    }
  };

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
      throw err;
    }
  };

  const register = (email: string, username: string) => {
    console.log(`Registering user: ${email}, ${username}`);
    setIsRegistered(true);
  };

  const verifyOtp = async (accessToken: string, refreshToken: string) => {
    try {
      await authenticate(accessToken, refreshToken);
      setIsRegistered(false);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await Promise.all([
      SecureStore.deleteItemAsync("access_token"),
      SecureStore.deleteItemAsync("refresh_token"),
      SecureStore.deleteItemAsync("user"),
    ]);
    setIsAuthenticated(false);
    setIsRegistered(false);
  };

  // Enhanced token validation on app start
  const checkAuth = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("access_token");

      if (!accessToken) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Check if token is expired
      if (isTokenExpired(accessToken)) {
        console.log("Access token expired, attempting refresh...");

        const refreshToken = await SecureStore.getItemAsync("refresh_token");

        if (refreshToken && !isTokenExpired(refreshToken)) {
          // Try to refresh the access token
          try {
            const response = await fetch("YOUR_API_URL/auth/refresh", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
              const data = await response.json();
              await authenticate(data.accessToken, refreshToken);
              setLoading(false);
              return;
            }
          } catch (error) {
            console.error("Token refresh failed:", error);
          }
        }

        // If refresh failed or refresh token expired, logout
        console.log("Token refresh failed, logging out...");
        await logout();
      } else {
        // Token is still valid
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      await logout();
    } finally {
      setLoading(false);
    }
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
