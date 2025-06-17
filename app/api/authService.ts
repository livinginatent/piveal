// src/api/auth.api.ts
import axiosInstance from "./axiosInstance";

// Updated payload for phone number-based registration
type RegisterPayload = {
  phoneNumber: string; // Changed from email
  username: string;
  password: string;
  dob: string;
};

// Updated response type
type RegisterResponse = {
  message: string;
  user: {
    id: string;
    phoneNumber: string; // Changed from email
    username: string;
  };
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  // Ensure the endpoint matches your backend route for registration (e.g., /auth/register)
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};

// You can add other authentication related API calls here
// For example, for OTP verification:
type VerifyOtpPayload = {
  phoneNumber: string;
  otp: string;
};

type VerifyOtpResponse = {
  accessToken: string;
  refreshToken: string;
  message: string;
};

export const verifyOtpApi = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  const response = await axiosInstance.post("/auth/verify-otp", payload);
  return response.data;
};

// For login (if you allow login by phone, username, or email)
type LoginPayload = {
  emailOrUsername: string; // Keeping this flexible as per your controller
  password: string;
};

type LoginResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email?: string; // Optional as per schema
    username: string;
    phoneNumber: string;
  };
};

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};
