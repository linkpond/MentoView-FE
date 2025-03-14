import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const deleteResume = async (resumeId) => {
    await apiClient.delete(`/api/resume/${resumeId}`);
};

const useDeleteResume = () => {
    return useMutation({
        mutationFn: deleteResume,
        onSuccess: () => {
            console.log("삭제 성공");
        },
        onError: (error) => {
            console.error("삭제 실패:", error);
        },
    });
};

export default useDeleteResume;
