import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSubscription = async () => {
  const token = sessionStorage.getItem("token")?.trim();
  if (!token) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const response = await axios.get("https://mentoview.site/api/subscription", {
    headers: { Authorization: `Bearer ${token}` },
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
