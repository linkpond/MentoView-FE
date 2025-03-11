import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSubscription = async () => {
  const response = await axios.get("http://localhost:8080/api/subscription", {
  });
  return response.data;
};

const useSubscriptionStatus = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscription,
  });
};

export default useSubscriptionStatus;
