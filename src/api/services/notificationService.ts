// services/notificationService.ts
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Constants from "expo-constants";
import axiosInstance from "../axiosInstance";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface NotificationData {
  type: string;
  friendRequestId?: string;
  senderId?: number;
  accepterId?: number;
  rejecterId?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface AppNotification {
  id: string;
  userId: number;
  title: string;
  body: string;
  data: NotificationData | null;
  type: string;
  isRead: boolean;
  isPushSent: boolean;
  pushSentAt: string | null;
  createdAt: string;
  updatedAt: string;
  friendRequest?: {
    id: string;
    sender: {
      id: number;
      username: string;
    };
  };
}

/**
 * Register for push notifications and get the Expo push token
 */
export async function registerForPushNotifications(): Promise<string | null> {
  let token: string | null = null;

  if (!Device.isDevice) {
    console.log("Push notifications only work on physical devices");
    return null;
  }

  // Check existing permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Request permission if not already granted
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return null;
  }

  // Get the Expo push token
  try {
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })
    ).data;
    console.log("Expo Push Token:", token);
  } catch (error) {
    console.error("Error getting push token:", error);
    return null;
  }

  // Set notification channel for Android
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

/**
 * Register device token with backend
 */
export async function registerDeviceToken(
  token: string,
  platform: string
): Promise<void> {
  try {
    await axiosInstance.post("/notifications/token/register", { token, platform });
    console.log("Device token registered successfully");
  } catch (error) {
    console.error("Error registering device token:", error);
    throw error;
  }
}

/**
 * Unregister device token from backend
 */
export async function unregisterDeviceToken(token: string): Promise<void> {
  try {
    await axiosInstance.post("/notifications/token/unregister", { token });
    console.log("Device token unregistered successfully");
  } catch (error) {
    console.error("Error unregistering device token:", error);
    throw error;
  }
}

/**
 * Fetch user's notifications from backend
 */
export async function getUserNotifications(
  limit?: number
): Promise<AppNotification[]> {
  try {
    const response = await axiosInstance.get("/notifications", {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(
  notificationId: string
): Promise<void> {
  try {
    await axiosInstance.put(`/notifications/${notificationId}/read`);
    console.log("Notification marked as read");
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

/**
 * Setup notification listeners
 */
export function setupNotificationListeners(
  onNotificationReceived?: (notification: Notifications.Notification) => void,
  onNotificationTapped?: (response: Notifications.NotificationResponse) => void
) {
  // Listener for notifications received while app is foregrounded
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("Notification received:", notification);
      if (onNotificationReceived) {
        onNotificationReceived(notification);
      }
    }
  );

  // Listener for user tapping on notification
  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification tapped:", response);
      if (onNotificationTapped) {
        onNotificationTapped(response);
      }
    });

  // Return cleanup function
  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
}

/**
 * Get badge count
 */
export async function getBadgeCount(): Promise<number> {
  return await Notifications.getBadgeCountAsync();
}

/**
 * Set badge count
 */
export async function setBadgeCount(count: number): Promise<void> {
  await Notifications.setBadgeCountAsync(count);
}

/**
 * Clear all notifications
 */
export async function clearAllNotifications(): Promise<void> {
  await Notifications.dismissAllNotificationsAsync();
}
