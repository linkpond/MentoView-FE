import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const modifyPassword = async (passwordData) => {
  const response = await apiClient.post("/api/mypage/password", passwordData);
  return response.data;
};

const useModifyPassword = () => {
  return useMutation(modifyPassword);
};

export default useModifyPassword;
