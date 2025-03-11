import axiosInstance from "./axiosInstance";

type RegisterPayload = {
  email: string;
  username: string;
  password: string;
  dob: string;
};

type RegisterResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};
