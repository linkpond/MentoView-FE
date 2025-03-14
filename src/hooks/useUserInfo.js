import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { setUser } from "../redux/authSlice";

const fetchUserInfo = async () => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) throw new Error("No token");

    const response = await axios.get("https://mentoview.site/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
    });

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
