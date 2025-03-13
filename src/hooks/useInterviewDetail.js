import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchInterviewDetail = async (interviewId) => {
    const token = sessionStorage.getItem("token");

    const { data } = await axios.get(`https://mentoview.site/api/interview/${interviewId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

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
