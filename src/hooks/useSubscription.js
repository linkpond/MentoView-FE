import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const requestSubscription = async () => {
    const token = sessionStorage.getItem("token");

    const response = await axios.post(
        "https://mentoview.site/api/subscription",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

const useSubscription = (onSuccess) => {
    return useMutation({
        mutationFn: requestSubscription,
        onSuccess,
    });
};

export default useSubscription;
