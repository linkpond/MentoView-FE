import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const deleteInterview = async (interviewId) => {
    await apiClient.delete(`/api/interview/${interviewId}`);
};

const useDeleteInterview = () => {
    return useMutation({
        mutationFn: deleteInterview,
        onSuccess: () => {
        },
        onError: (error) => {
        },
    });
};

export default useDeleteInterview;
