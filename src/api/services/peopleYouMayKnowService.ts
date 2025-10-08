// src/api/passwordService.ts
import axios from "axios";
import axiosInstance from "../axiosInstance";

// Define the user type based on what your API returns
type User = {
  id: number;
  username: string;
};

// API response type
type GetAllUsersResponse = {
  users: User[];
  // Add other response fields if your API returns them
  // message?: string;
  // success?: boolean;
};

// Error response type for better error handling
type ApiErrorResponse = {
  message: string;
  error?: string;
};

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  try {
    const response = await axiosInstance.get<GetAllUsersResponse>(
      "/people/getAll"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Unauthorized - Please login again");
      }

      // Type the error response data
      const errorData = error.response?.data as ApiErrorResponse;
      throw new Error(errorData?.message || "Failed to fetch people");
    }
    throw new Error("Network error - Please check your connection");
  }
};
