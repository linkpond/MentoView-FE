import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const deleteInterview = async (interviewId) => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) {
        throw new Error("인증 토큰이 없습니다.");
    }

    await axios.delete(`https://mentoview.site/api/interview/${interviewId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
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