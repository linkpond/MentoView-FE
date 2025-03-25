import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const requestSubscription = async () => {
  const response = await apiClient.post("/api/subscription/freetier");
  return response.data;
};

const useSubscriptionFree = (onSuccess) => {
  return useMutation({
    mutationFn: requestSubscription,
    onSuccess,
  });
};

export default useSubscriptionFree;
