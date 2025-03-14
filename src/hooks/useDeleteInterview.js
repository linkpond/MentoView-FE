import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const deleteInterview = async (interviewId) => {
    await apiClient.delete(`/api/interview/${interviewId}`);
};

const useDeleteInterview = () => {
    return useMutation({
        mutationFn: deleteInterview,
        onSuccess: () => {
            console.log("삭제 성공");
        },
        onError: (error) => {
            console.error("삭제 실패:", error);
        },
    });
};

export default useDeleteInterview;
