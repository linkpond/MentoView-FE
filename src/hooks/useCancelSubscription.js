import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const cancelSubscriptionAPI = async (subId) => {
    const token = sessionStorage.getItem("token")?.trim();
    if (!token) {
        throw new Error("인증 토큰이 없습니다.");
    }

    const response = await axios.delete(`https://mentoview.site/api/subscription/${subId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

const useCancelSubscription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelSubscriptionAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["subscription"]);
        },
        onError: (error) => {
            alert(`해지 실패: ${error.response?.data?.message || error.message}`);
        },
    });
};

export default useCancelSubscription;
