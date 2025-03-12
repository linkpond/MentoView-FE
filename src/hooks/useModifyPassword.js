import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const modifyPassword = async (passwordData) => {
  const token = sessionStorage.getItem("token");

  const response = await axios.post("https://mentoview.site/api/mypage/password", passwordData, {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const useModifyPassword = () => {
  return useMutation(modifyPassword);
};

export default useModifyPassword;
