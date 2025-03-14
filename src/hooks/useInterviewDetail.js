import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const fetchInterviewDetail = async (interviewId) => {
    const { data } = await apiClient.get(`/api/interview/${interviewId}`);
    return data;
};

const useInterviewDetail = (interviewId) => {
    return useQuery({
        queryKey: ["interviewDetail", interviewId],
        queryFn: () => fetchInterviewDetail(interviewId),
        enabled: !!interviewId,
    });
};

export default useInterviewDetail;
