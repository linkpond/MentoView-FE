import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchInterviewStatus = async (interviewId) => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get(`https://mentoview.site/api/interview/${interviewId}/status`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

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
