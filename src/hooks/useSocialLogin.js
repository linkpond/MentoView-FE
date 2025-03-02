import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice.js";
import { useGoogleLogin } from "@react-oauth/google";

const useSocialLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (authCode) => {
      const response = await fetch("http://localhost:8080/api/auth/me", { // ✅ API 엔드포인트 변경
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ 쿠키 포함
        body: JSON.stringify({ code: authCode }), // ✅ authCode를 JSON으로 전달
      });

      if (!response.ok) {
        throw new Error("소셜 로그인 실패!");
      }

      return response.json();
    },
    onSuccess: (data) => {
      dispatch(login(data)); // ✅ Redux 상태 업데이트
      console.log("✅ 로그인 성공:", data);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.error("❌ 로그인 실패:", error.message);
    },
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("✅ 구글 로그인 성공:", tokenResponse);
      mutation.mutate(tokenResponse.code); // ✅ authCode 전달
    },
    onError: () => {
      console.error("❌ 구글 로그인 실패!");
    },
    flow: "auth-code", // ✅ Authorization Code Flow 사용
  });

  return { loginWithGoogle };
};

export default useSocialLogin;
