import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const socialPasswordRequest = async (passwordData) => {
    const response = await apiClient.post("/api/social/password", passwordData);
    return response.data;
};

export const useSocialPassword = () => {
    return useMutation({
        mutationFn: socialPasswordRequest,
    });
};
