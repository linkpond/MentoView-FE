import { useEffect } from "react";
import apiClient from "../api/apiClient";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const refreshAccessToken = async (dispatch, navigate) => {
    try {
        const response = await apiClient.post("/api/token/access");

        if (response.status === 200 && response.headers["authorization"]) {
            sessionStorage.setItem("token", response.headers["authorization"].replace("Bearer ", ""));
        }
    } catch (error) {
        console.error("Failed to refresh access token", error);
        
        dispatch(setUser(null));
        sessionStorage.removeItem("token");
        navigate("/login");
    }
};

export const useTokenRefresh = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => refreshAccessToken(dispatch, navigate), 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [dispatch, navigate]);
};
