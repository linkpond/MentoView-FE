import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const deleteResume = async (resumeId) => {
    await apiClient.delete(`/api/resume/${resumeId}`);
};

const useDeleteResume = () => {
    return useMutation({
        mutationFn: deleteResume,
        onSuccess: () => {
        },
        onError: (error) => {
        },
    });
};

export default useDeleteResume;
