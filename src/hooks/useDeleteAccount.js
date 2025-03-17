import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

const useDeleteAccount = () => {
    return useMutation({
        mutationFn: async () => {
            const user = JSON.parse(sessionStorage.getItem("user"));
            if (!user || !user.userId) {
                throw new Error("사용자 정보가 없습니다.");
            }

            const response = await apiClient.delete(`/api/mypage/delete/${user.userId}`);
            return response.data;
        }
    });
};

export default useDeleteAccount;
