import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

export const setupInterceptors = (showToast) => {
  API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 429) {
        showToast(
          "warn",
          "Rate Limit Exceeded",
          "Please wait a moment before sending more messages.",
        );
      } else if (!error.response) {
        showToast(
          "error",
          "Connection Error",
          "Backend server is unreachable.",
        );
      }
      return Promise.reject(error);
    },
  );
};

export const sendMessage = (sessionId, message) =>
  API.post("/chat", { sessionId, message });

export const getHistory = (sessionId) => API.get(`/conversations/${sessionId}`);

export const getSessions = () => API.get("/sessions");
