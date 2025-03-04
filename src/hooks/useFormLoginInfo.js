import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const loginRequest = async (formData) => {
    const response = await axios.post("http://localhost:8080/api/login", formData);
    return response.data;
};

export const useFormLoginInfo = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            dispatch(setUser(data));
            sessionStorage.setItem("user", JSON.stringify(data));
            sessionStorage.setItem("token", data.token);
        },
        onError: (err) => {
            console.log("로그인 실패:", err.response?.data || err.message);
        },
    });
};
