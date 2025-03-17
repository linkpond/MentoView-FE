import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { logout } from "../redux/authSlice";

const logoutRequest = async () => {
    await apiClient.post("/api/logout");
};

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logoutRequest,
        onSuccess: () => {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("isAuthenticated");
            dispatch(logout());
            navigate("/");
        },
        onError: (error) => {
            console.error("로그아웃 실패:", error);
        },
    });
};

export default useLogout;
