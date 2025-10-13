// src/api/auth.api.ts
import axiosInstance from "../axiosInstance";

export type RegisterPayload = {
  email: string; // Changed from email
  username: string;
  password: string;
  role: string;
};

// Updated response type
type RegisterResponse = {
  message: string;
  user: {
    id: string;
    email: string; // Changed from email
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
  email?: string;
  otp: string;
  identifier?: string | null;
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

// For login
type LoginPayload = {
  identifier: string; // Keeping this flexible as per your controller
  password: string;
};

type LoginResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
  };
};

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};

// Payload & response for resending OTP
export type ResendOtpPayload = {
  email?: string | null;
  identifier?: string | null;
};

export type ResendOtpResponse = {
  message: string;
  expiresAt: string;
};

export const resendOtpApi = async (
  payload: ResendOtpPayload
): Promise<ResendOtpResponse> => {
  const response = await axiosInstance.post("/auth/resend-otp", payload);
  return response.data;
};
