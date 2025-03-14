import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const socialPasswordRequest = async (passwordData) => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) throw new Error("No token");

    const response = await axios.post("http://localhost:8080/api/social/password", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const useSocialPassword = () => {
    return useMutation({
        mutationFn: socialPasswordRequest,
    });
};
