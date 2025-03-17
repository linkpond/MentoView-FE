import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const modifyPassword = async (passwordData) => {
  try {
    const response = await apiClient.post("/api/mypage/password", passwordData);
    return response.data;
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    throw error;
  }
};

export const useModifyPassword = () => {
  return useMutation({
    mutationFn: modifyPassword,
  });
};