import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const signupRequest = async (userData) => {
  const response = await axios.post('https://mentoview.site/api/signup/form', userData);
  return response.data;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signupRequest
  });
};
