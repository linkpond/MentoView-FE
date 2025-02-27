import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice.js";
import { useGoogleLogin } from "@react-oauth/google";

const useSocialLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient(); // ✅ QueryClient 가져오기 (필요한 경우)

  const mutation = useMutation({
    mutationFn: async (authCode) => {
      const response = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code: authCode }),
      });

      if (!response.ok) {
        throw new Error("소셜 로그인 실패!");
      }

      return response.json();
    },
    onSuccess: (data) => {
      dispatch(login(data));
      console.log("✅ 로그인 성공:", data);
      console.log("🛠 현재 Redux 상태:", JSON.parse(sessionStorage.getItem("user")));
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("구글 로그인 성공!", tokenResponse);
      mutation.mutate(tokenResponse.code);
    },
    onError: () => {
      console.error("구글 로그인 실패!");
    },
    flow: "auth-code",
  });

  return { loginWithGoogle };
};

export default useSocialLogin;
