import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

const fetchInterviewQuestions = async (resumeId) => {
    try {
        const response = await apiClient.post('/api/interview/start', { resumeId });
        return response.data;
    } catch (error) {
        throw new Error('인터뷰 질문 가져오기 실패');
    }
};

const useInterviewQuestion = (resumeId) => {
    const query = useQuery({
        queryKey: ['interviewQuestions', resumeId],
        queryFn: () => fetchInterviewQuestions(resumeId),
        enabled: !!resumeId,
    });

    return { data: query.data, isLoading: query.isLoading, isError: query.isError, refetch: query.refetch };
};

export default useInterviewQuestion;
