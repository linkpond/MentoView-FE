import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMe = async () => {
    const token = localStorage.getItem("token")?.trim();;
    console.log(token);
    if (!token) throw new Error("No token");

    const { data } = await axios.get("http://localhost:8080/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
    });

    return data;
};

export const useAuthMe = () => {
    return useQuery({
        queryKey: ["authMe"],
        queryFn: fetchMe,
        enabled: false,
    });
};
