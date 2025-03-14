import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const useMyPageAuth = () => {
    return useMutation({
        mutationFn: async (password) => {
            const response = await apiClient.post("/api/mypage", { password });
            return response.data;
        }
    });
};

export default useMyPageAuth;