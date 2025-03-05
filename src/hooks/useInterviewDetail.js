import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchInterviewDetail = async (interviewId) => {
    const { data } = await axios.get(`http://localhost:8080/api/interview/${interviewId}`);
    return data;
};

const useInterviewDetail = (interviewId) => {
    return useQuery({
        queryKey: ['interviewDetail', interviewId],
        queryFn: () => fetchInterviewDetail(interviewId),
        enabled: !!interviewId,
    });
};


export default useInterviewDetail;
