import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const refreshAccessToken = async (dispatch, navigate) => {
    try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const response = await axios.post(
            "http://localhost:8080/api/token/access", 
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200 && response.headers["authorization"]) {
            sessionStorage.setItem("token", response.headers["authorization"]);
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
