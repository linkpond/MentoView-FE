import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const cancelSubscriptionAPI = async (subId) => {
    const response = await apiClient.delete(`/api/subscription/${subId}`);
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
