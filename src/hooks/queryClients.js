import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onMutate: async (variables) => {
        const token = sessionStorage.getItem("token");
        if (token) {
          variables.headers = {
            ...variables.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        return variables;
      },
    },
  },
});

export default queryClient;
