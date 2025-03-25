import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

const fetchInterviewStatus = async (interviewId) => {
    const response = await apiClient.get(`/api/interview/${interviewId}/status`);
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
