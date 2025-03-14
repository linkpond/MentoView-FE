import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const loginRequest = async (formData) => {
    await axios.post("https://mentoview.site/api/login", formData);
};

export const useSubmitLoginRequest = () => {
    return useMutation({
        mutationFn: loginRequest,
        onError: (err) => {
            console.log("로그인 실패:", err.response?.data || err.message);
        },
    });
};
