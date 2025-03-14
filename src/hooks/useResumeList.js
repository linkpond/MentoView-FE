import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchResumes = async () => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) {
        throw new Error("인증 토큰이 없습니다.");
    }

    const { data } = await axios.get('https://mentoview.site/api/resume', {
        headers: { Authorization: `Bearer ${token}` },
    });

    return data;
};

const useResumeList = () => {
    return useQuery({
        queryKey: ['resumes'],
        queryFn: fetchResumes,
        refetchOnWindowFocus: false,
    });
};

export default useResumeList;
