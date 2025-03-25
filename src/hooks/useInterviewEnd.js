import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const uploadInterviewFiles = async (audioFiles) => {
    const formData = new FormData();
    audioFiles.forEach((file) => {
        if (!file.questionId) return;
        formData.append("files", file.audioBlob, `audio_${file.questionId}.wav`);
    });

    try {
        const response = await apiClient.post("/api/interview/end", formData, {
            headers: {
                ...apiClient.defaults.headers.common,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("업로드 실패:", error);
        if (error.response) {
            console.error("서버 오류 메시지:", error.response.data);
        }
        throw error;
    }
};

const useInterviewEnd = () => {
    return useMutation({
        mutationFn: uploadInterviewFiles,
    });
};

export default useInterviewEnd;
