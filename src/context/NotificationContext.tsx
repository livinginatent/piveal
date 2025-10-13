import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as Device from "expo-device";
import { Platform } from "react-native";
import {
  registerForPushNotifications,
  registerDeviceToken,
  getUserNotifications,
  markNotificationAsRead,
  clearAllNotifications,
  getBadgeCount,
  setBadgeCount,
  setupNotificationListeners,
  AppNotification,
} from "../api/services/notificationService";
import { io, Socket } from "socket.io-client";
import * as SecureStore from "expo-secure-store";

type NotificationContextType = {
  notifications: AppNotification[];
  badgeCount: number;
  loading: boolean;
  registerPushToken: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  clearNotifications: () => Promise<void>;
};
type User = {
  username: string;
  email: string;
  isVerified: boolean;
  id: number;
};
const NotificationContext = createContext<NotificationContextType>(null!);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [badgeCount, setBadge] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pushToken, setPushToken] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, setSocket] = useState<Socket | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const loggedUser = await SecureStore.getItemAsync("user");
        if (loggedUser) {
          console.log(loggedUser, "123 hello");
          setUser(JSON.parse(loggedUser)); // Parse string to object
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUser(); // Call the function on component mount
  }, []);

 useEffect(() => {
   if (!user?.id) {
     console.log("Waiting for user ID to initialize socket...");
     return;
   }

   console.log(`Initializing socket for user ${user.id}`);

   // Replace with your backend URL
   const newSocket = io("https://piveal-backend.onrender.com", {
     transports: ["polling", "websocket"], // Try polling first     reconnection: true,
     reconnectionDelay: 1000,
     reconnectionAttempts: 5,
   });

   newSocket.on("connect", () => {
     console.log("✅ Socket connected:", newSocket.id);
     console.log(`Registering user ${user.id} with socket`);
     newSocket.emit("register", user.id);
   });

   newSocket.on("new_notification", (notification: AppNotification) => {
     console.log("🔔 Received new notification via socket:", notification);
     // Add new notification to state
     setNotifications((prev) => [notification, ...prev]);
     // Update badge count
     setBadge((prev) => prev + 1);
   });

   newSocket.on("disconnect", () => {
     console.log("❌ Socket disconnected");
   });

   newSocket.on("connect_error", (error) => {
     console.error("Socket connection error:", error);
   });

   setSocket(newSocket);

   return () => {
     console.log("Closing socket connection");
     newSocket.close();
   };
 }, [user?.id]);

  /**
   * Register for Expo push notifications and store token in backend
   */
  const registerPushToken = async () => {
    try {
      const token = await registerForPushNotifications();
      if (token) {
        const platform = Platform.OS;
        await registerDeviceToken(token, platform);
        setPushToken(token);
      }
    } catch (err) {
      console.error("Push registration failed:", err);
    }
  };

  /**
   * Fetch user notifications from backend
   */
  const refreshNotifications = async () => {
    try {
      setLoading(true);
      const data = await getUserNotifications(20);
      setNotifications(data);
      const count = await getBadgeCount();
      setBadge(count);
    } catch (err) {
      console.error("Error loading notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Mark a single notification as read
   */
  const markAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      const count = await getBadgeCount();
      setBadge(count);
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  /**
   * Clear all notifications
   */
  const clearNotifications = async () => {
    try {
      await clearAllNotifications();
      setNotifications([]);
      await setBadgeCount(0);
      setBadge(0);
    } catch (err) {
      console.error("Error clearing notifications:", err);
    }
  };

  /**
   * Setup listeners for foreground and tap events
   */
  useEffect(() => {
    const unsubscribe = setupNotificationListeners(
      async (notification) => {
        console.log("New in-app notification:", notification);
        await refreshNotifications();
      },
      async (response) => {
        console.log("Notification tapped:", response);
        await refreshNotifications();
      }
    );

    return unsubscribe;
  }, []);

  /**
   * Register and fetch initial notifications on mount
   */
  useEffect(() => {
    (async () => {
      if (Device.isDevice) {
        await registerPushToken();
      } else {
        console.log("Running on simulator — skipping push token registration");
      }

      // Always fetch notifications (even on simulator)
      await refreshNotifications();
    })();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        badgeCount,
        loading,
        registerPushToken,
        refreshNotifications,
        markAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
