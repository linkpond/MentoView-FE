import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const signupRequest = async (userData) => {
  const response = await axios.post('http://localhost:8080/api/signup/form', userData);
  return response.data;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signupRequest
  });
};
