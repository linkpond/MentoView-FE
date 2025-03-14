import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const uploadResume = async (formData) => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) {
        throw new Error("인증 토큰이 없습니다.");
    }

    try {
        const response = await axios.post('https://mentoview.site/api/resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('파일 업로드 실패');
    }
};

const useUploadResume = () => {
    return useMutation({
        mutationFn: uploadResume,
        onSuccess: (data) => {
            console.log("파일 업로드 성공:", data);
        },
        onError: (error) => {
            console.error("파일 업로드 실패:", error);
        },
    });
};

export default useUploadResume;
