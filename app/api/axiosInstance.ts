import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://piveal-backend.onrender.com"; // replace with ENV in prod

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token if available
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 etc.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle global errors like 401 Unauthorized here
    if (error.response?.status === 401) {
      // Possibly trigger logout or refresh token
      console.log("Unauthorized - redirecting or logging out...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
