import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchResumes = async () => {
    const { data } = await axios.get('http://localhost:8080/api/resume');
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
