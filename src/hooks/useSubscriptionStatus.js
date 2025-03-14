import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const fetchSubscription = async () => {
  const response = await apiClient.get("/api/subscription");
  return response.data;
};

const useSubscriptionStatus = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscription,
  });
};

export default useSubscriptionStatus;
