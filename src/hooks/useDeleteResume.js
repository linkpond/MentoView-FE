import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteResume = async (resumeId) => {
    await axios.delete(`https://mentoview.site/api/resume/${resumeId}`);
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
