import axiosInstance from "./axiosInstance"; // adjust path as needed

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  // Add other user properties as needed based on your user model
}

export interface PeopleYouMayKnowResponse {
  success: boolean;
  data: User[];
  message?: string;
}

/**
 * Fetch all users from the database
 * @returns Promise<User[]> - Array of users
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get<PeopleYouMayKnowResponse>(
      "people/getAll"
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch users");
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching all users:", error);

    if (error.response?.status === 404) {
      throw new Error("Users endpoint not found");
    } else if (error.response?.status === 500) {
      throw new Error("Server error while fetching users");
    } else if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout - please try again");
    } else {
      throw new Error(error.message || "Failed to fetch users");
    }
  }
};
