import { useMutation } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

const uploadResume = async (formData) => {
    try {
        const response = await apiClient.post('/api/resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
        },
        onError: (error) => {
        },
    });
};

export default useUploadResume;