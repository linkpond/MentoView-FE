import { useMutation } from "@tanstack/react-query";
import publicApiClient from "../api/publicApiClient";

const loginRequest = async (formData) => {
    await publicApiClient.post("/api/login", formData);
};

export const useSubmitLoginRequest = () => {
    return useMutation({
        mutationFn: loginRequest,
        onError: (err) => {
            console.log("로그인 실패:", err.response?.data || err.message);
        },
    });
};
