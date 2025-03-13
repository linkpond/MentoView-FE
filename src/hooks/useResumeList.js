import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchResumes = async () => {
    const token = sessionStorage.getItem("token");

    const { data } = await axios.get("https://mentoview.site/api/resume", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

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
