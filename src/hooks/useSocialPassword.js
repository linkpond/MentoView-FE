import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const socialPasswordRequest = async (passwordData) => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) throw new Error("인증 토큰이 없습니다.");

    const response = await axios.post("https://mentoview.site/api/social/password", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const useSocialPassword = () => {
    return useMutation({
        mutationFn: socialPasswordRequest,
    });
};
