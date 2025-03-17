import { useMutation } from "@tanstack/react-query";
import publicApiClient from "../api/publicApiClient";

const loginRequest = async (formData) => {
    const response = await publicApiClient.post("/api/login", formData);
    return response.data;
};

export const useSubmitLoginRequest = () => {
    return useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            console.log("로그인 성공, 응답 데이터:", data);
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        },
        onError: (err) => {
            console.log("로그인 실패:", err.response?.data || err.message);
        },
    });
};