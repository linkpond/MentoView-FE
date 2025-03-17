import { useMutation } from "@tanstack/react-query";
import publicApiClient from "../api/publicApiClient";

const loginRequest = async (formData) => {
    const response = await publicApiClient.post("/api/login", formData, { 
    });
    console.log("🔍 로그인 응답:", response);
    return response;
};

export const useSubmitLoginRequest = () => {
    return useMutation({
        mutationFn: loginRequest,
        onSuccess: (data, variables, context) => {
            console.log("로그인 성공, 응답 데이터:", data);

            const redirectUrl = context?.response?.headers?.get("location");
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                console.log("🚨 redirectUrl이 없음! 서버 응답 확인 필요");
            }
        },
        onError: (err) => {
            console.log("로그인 실패:", err.response?.data || err.message);
        },
    });
};
