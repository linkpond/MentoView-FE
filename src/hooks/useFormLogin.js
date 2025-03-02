import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const loginRequest = async (userData) => {
    const response = await axios.post("http://localhost:8080/api/login", userData);
    return response.data;
  };
  
  export const useLogin = () => {
    const dispatch = useDispatch();
  
    return useMutation({
      mutationFn: loginRequest,
      onSuccess: (data) => {
        console.log("✅ 로그인 성공:", data);
        dispatch(login(data));
      },
      onError: (err) => {
        console.error("❌ 로그인 실패:", err.response?.data || err.message);
      },
    });
  };