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

type NotificationContextType = {
  notifications: AppNotification[];
  badgeCount: number;
  loading: boolean;
  registerPushToken: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  clearNotifications: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType>(null!);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [badgeCount, setBadge] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pushToken, setPushToken] = useState<string | null>(null);

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
