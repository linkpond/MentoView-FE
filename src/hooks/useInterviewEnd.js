import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const uploadInterviewFiles = async (audioFiles) => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) {
        throw new Error("인증 토큰이 없습니다.");
    }

    const formData = new FormData();
    audioFiles.forEach((file) => {
        if (!file.questionId) return;
        formData.append("files", file.audioBlob, `audio_${file.questionId}.wav`);
    });

    try {
        const response = await axios.post("https://mentoview.site/api/interview/end", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
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
