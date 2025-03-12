import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const requestSubscription = async () => {
  const response = await axios.post("https://mentoview.site/api/subscription", {}, {
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
