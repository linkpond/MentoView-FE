import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchInterviewStatus = async (interviewId) => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) {
        throw new Error("인증 토큰이 없습니다.");
    }

    const response = await axios.get(
        `https://mentoview.site/api/interview/${interviewId}/status`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

const useInterviewStatus = () => {
    const interviewId = useSelector((state) => state.interview.interviewId);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['interviewStatus', interviewId],
        queryFn: () => fetchInterviewStatus(interviewId),
        enabled: !!interviewId,
        refetchInterval: 10000,
    });

    return { data, isLoading, isError };
};

export default useInterviewStatus;
