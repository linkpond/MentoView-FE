import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const fetchResumes = async () => {
    const { data } = await apiClient.get("/api/resume");
    return data;
};

const useResumeList = () => {
    return useQuery({
        queryKey: ["resumes"],
        queryFn: fetchResumes,
        refetchOnWindowFocus: false,
    });
};

export default useResumeList;
