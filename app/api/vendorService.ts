// src/api/auth.api.ts
import axiosInstance from "./axiosInstance";

export type RegisterPayload = {
  email: string; // Changed from email
  username: string;
  password: string;
};

export interface Vendor {
  id: string;
  name: string;
  venueName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  // Add any other fields you expect from the vendor object
}

export type GetAllVendorsResponse = Vendor[];

export const getAllVendors = async (): Promise<GetAllVendorsResponse> => {
  // Ensure the endpoint matches your backend route for registration (e.g., /auth/register)
  const response = await axiosInstance.post("/vendors/getAllVendors");
  return response.data;
};


