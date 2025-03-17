import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const modifyPassword = async (passwordData) => {
  console.log("🛠 API 호출됨:", passwordData);
  try {
      const response = await apiClient.post("/api/mypage/password", passwordData);
      console.log("✅ 응답 성공:", response.data);
      return response.data;
  } catch (error) {
      console.error("❌ API 요청 실패:", error);
      throw error;
  }
};

const useModifyPassword = () => {
  return useMutation(modifyPassword);
};

export default useModifyPassword;
