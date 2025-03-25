import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";
import { setUser } from "../redux/authSlice";

const fetchUserInfo = async () => {
    const response = await apiClient.get("/api/auth/me");

    const newAccessToken = response.headers["authorization"];
    if (newAccessToken) {
        sessionStorage.removeItem("token");
        sessionStorage.setItem("token", newAccessToken.replace("Bearer ", ""));
    }

    return response.data;
};

export const useUserInfo = () => {
    const dispatch = useDispatch();

    return useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                dispatch(setUser(user));
                return user;
            }
            const data = await fetchUserInfo();
            dispatch(setUser(data));
            return data;
        },
        enabled: true,
    });
};