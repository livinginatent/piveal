// src/api/passwordService.ts
import axiosInstance from "./axiosInstance";

// Payload for initiating password reset (sending OTP)
export type InitiatePasswordResetPayload = {
  identifier: string; // email or username
};

type InitiatePasswordResetResponse = {
  message: string;
  expiresAt?: string;
};

export const initiatePasswordResetApi = async (
  payload: InitiatePasswordResetPayload
): Promise<InitiatePasswordResetResponse> => {
  const response = await axiosInstance.post(
    "/password/initiate-password-reset",
    payload
  );
  return response.data;
};

// Payload for verifying password reset OTP
export type VerifyPasswordOtpPayload = {
  identifier: string; // email or username
  otp: string;
};

type VerifyPasswordOtpResponse = {
  message: string;
  token?: string; // Optional reset token for additional security
};

export const verifyPasswordOtpApi = async (
  payload: VerifyPasswordOtpPayload
): Promise<VerifyPasswordOtpResponse> => {
  const response = await axiosInstance.post(
    "/password/verify-password-otp",
    payload
  );
  return response.data;
};

// Payload for resetting password
export type ResetPasswordPayload = {
  identifier: string; // email or username
  newPassword: string;
};

type ResetPasswordResponse = {
  message: string;
};

export const resetPasswordApi = async (
  payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> => {
  const response = await axiosInstance.post(
    "/password/reset-password",
    payload
  );
  return response.data;
};

// Payload for changing password (when user is logged in)
export type ChangePasswordPayload = {
  userId: string | number;
  currentPassword: string;
  newPassword: string;
};

type ChangePasswordResponse = {
  message: string;
};

export const changePasswordApi = async (
  payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> => {
  const response = await axiosInstance.post(
    "/password/change-password",
    payload
  );
  return response.data;
};
