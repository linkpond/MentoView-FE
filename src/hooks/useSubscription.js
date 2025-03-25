import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const requestSubscription = async () => {
  const response = await apiClient.post("/api/subscription");
  return response.data;
};

const useSubscription = (onSuccess) => {
  return useMutation({
    mutationFn: requestSubscription,
    onSuccess,
  });
};

export default useSubscription;
