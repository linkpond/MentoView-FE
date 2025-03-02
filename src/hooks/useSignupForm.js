import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useSignupForm = () => {
  return useMutation(async () => {
    const data = {
      name: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };
    
    const response = await axios.post('/api/signup/form', data);
    return response.data;
  });
};

export default useSignupForm;
