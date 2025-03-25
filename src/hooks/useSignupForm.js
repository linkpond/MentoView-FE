import { useMutation } from "@tanstack/react-query";
import publicApiClient from "../api/publicApiClient";

const signupRequest = async (userData) => {
    const response = await publicApiClient.post("/api/signup/form", userData);
    return response.data;
};

export const useSignup = () => {
    return useMutation({
        mutationFn: signupRequest,
    });
};
