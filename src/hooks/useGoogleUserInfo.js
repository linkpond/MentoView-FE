import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { setUser } from "../redux/authSlice";

const fetchGoogleUserInfo = async () => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) throw new Error("No token");

    const response = await axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
    });

    const newAccessToken = response.headers["authorization"];
    if (newAccessToken) {
        sessionStorage.removeItem("token");
        sessionStorage.setItem("token", newAccessToken.replace("Bearer ", ""));

    }

    return response.data;
};

export const useGoogleUserInfo = () => {
    const dispatch = useDispatch();

    return useQuery({
        queryKey: ["googleUserInfo"],
        queryFn: async () => {
            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                dispatch(setUser(user));
                return user;
            }
            const data = await fetchGoogleUserInfo();
            dispatch(setUser(data));
            return data;
        },
        enabled: true,
    });
};
