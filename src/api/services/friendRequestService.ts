import axios from "axios";
import axiosInstance from "../axiosInstance";

/* =========================
   Types
   ========================= */
export type User = {
  id: number;
  username: string;
  email?: string;
};

export type FriendRequest = {
  id: string;
  senderId: number;
  receiverId: number;
  message?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  createdAt?: string;
  respondedAt?: string | null;
  sender?: User;
  receiver?: User;
};

export type Friendship = {
  id: string;
  user1Id: number;
  user2Id: number;
  friendsSince?: string;
};

export type FriendStats = {
  friendsCount: number;
  pendingRequestsCount: number;
  sentRequestsCount: number;
  totalGiftsSent: number;
  totalGiftsReceived: number;
};

export type BlockedUser = {
  id: number;
  blockerId: number;
  blockedUserId: number;
  reason?: string;
  createdAt?: string;
  blockedUser?: User;
};

// Error response type for better error handling
type ApiErrorResponse = {
  message: string;
  error?: string;
};

/* =========================
   Friend Request Services
   ========================= */

// Send friend request
export const sendFriendRequest = async (
  receiverId: number,
  message?: string
) => {
  try {
    const response = await axiosInstance.post<FriendRequest>(
      "/friend/request",
      {
        receiverId,
        message,
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to send friend request");
  }
};

// Accept friend request
export const acceptFriendRequest = async (requestId: string) => {
  try {
    const response = await axiosInstance.post(`/friend/accept/${requestId}`);
    return response.data as {
      friendship: Friendship;
      friendRequest: FriendRequest;
    };
  } catch (error) {
    handleApiError(error, "Failed to accept friend request");
  }
};

// Reject friend request
export const rejectFriendRequest = async (requestId: string) => {
  try {
    const response = await axiosInstance.post<FriendRequest>(
      `/friend/reject/${requestId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to reject friend request");
  }
};

// Cancel friend request
export const cancelFriendRequest = async (requestId: string) => {
  try {
    const response = await axiosInstance.post<FriendRequest>(
      `/friend/cancel/${requestId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to cancel friend request");
  }
};

// Get friend requests (sent / received / all)
export const getFriendRequests = async (
  type: "sent" | "received" | "all" = "all"
) => {
  try {
    const response = await axiosInstance.get<FriendRequest[]>(
      "/friend/requests",
      {
        params: { type },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch friend requests");
  }
};

// Get friends list
export const getFriends = async (search?: string) => {
  try {
    const response = await axiosInstance.get<User[]>("/friend/friends", {
      params: { search },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch friends list");
  }
};

// Remove friend
export const removeFriend = async (friendId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/friend/friends/remove/${friendId}`
    );
    return response.data as { success: boolean; message: string };
  } catch (error) {
    handleApiError(error, "Failed to remove friend");
  }
};

// Block user
export const blockUser = async (blockedUserId: number, reason?: string) => {
  try {
    const response = await axiosInstance.post<BlockedUser>("/friend/block", {
      blockedUserId,
      reason,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to block user");
  }
};

// Unblock user
export const unblockUser = async (blockedUserId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/friend/unblock/${blockedUserId}`
    );
    return response.data as { success: boolean; message: string };
  } catch (error) {
    handleApiError(error, "Failed to unblock user");
  }
};

// Search users
export const searchUsers = async (query: string, limit = 20) => {
  try {
    const response = await axiosInstance.get<User[]>("/friend/search", {
      params: { query, limit },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to search users");
  }
};

// Get blocked users
export const getBlockedUsers = async () => {
  try {
    const response = await axiosInstance.get<BlockedUser[]>("/friend/blocked");
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch blocked users");
  }
};

// Get friendship stats
export const getFriendshipStats = async () => {
  try {
    const response = await axiosInstance.get<FriendStats>("/friend/stats");
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch friendship stats");
  }
};

/* =========================
   Helper: Error handler
   ========================= */
function handleApiError(error: unknown, defaultMessage: string): never {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized - Please login again");
    }
    const errorData = error.response?.data as ApiErrorResponse;
    throw new Error(errorData?.message || defaultMessage);
  }
  throw new Error("Network error - Please check your connection");
}
