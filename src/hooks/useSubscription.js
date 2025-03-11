import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const requestSubscription = async () => {
  const response = await axios.post("https://da14-58-123-254-149.ngrok-free.app/api/subscription", {}, {
  });

  return response.data;
};

const useSubscription = (onSuccess) => {
  return useMutation({
    mutationFn: requestSubscription,
    onSuccess,
  });
};


export default useSubscription;
