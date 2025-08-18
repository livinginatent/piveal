// src/api/passwordService.ts
import axios from "axios";
import axiosInstance from "./axiosInstance";

type GetAllPeopleResponse = {
 users:[]
};
export const getAllPeople = async (): Promise<GetAllPeopleResponse> => {
  try {
    const response = await axiosInstance.get("/people/getAll");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Handle unauthorized error (token expired, invalid, etc.)
        throw new Error("Unauthorized - Please login again");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch people"
      );
    }
    throw new Error("Network error - Please check your connection");
  }
};