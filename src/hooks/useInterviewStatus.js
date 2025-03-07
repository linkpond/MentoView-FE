import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchInterviewStatus = async (interviewId) => {
    const response = await axios.get(`http://localhost:8080/api/interview/${interviewId}/status`);
    return response.data;
};

const useInterviewStatus = () => {
    const interviewId = useSelector((state) => state.interview.interviewId);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['interviewStatus', interviewId],
        queryFn: () => fetchInterviewStatus(interviewId),
        enabled: !!interviewId,
        refetchInterval: 10000,
        onSuccess: (data) => {
        },
    });

    return { data, isLoading, isError };
};

export default useInterviewStatus;
