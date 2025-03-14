import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchInterviewQuestions = async (resumeId) => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) {
        throw new Error("인증 토큰이 없습니다.");
    }

    try {
        const response = await axios.post(
            'https://mentoview.site/api/interview/start',
            { resumeId },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
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
