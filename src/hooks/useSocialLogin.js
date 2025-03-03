import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice.js";
import { useGoogleLogin } from "@react-oauth/google";

const useSocialLogin = () => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: async (authCode) => {
      const response = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authCode }),
      });

      if (!response.ok) {
        throw new Error("소셜 로그인 실패!");
      }

      const data = await response.json();

      // 🔹 JWT 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", data.accessToken);

      return data;
    },
    onSuccess: (data) => {
      dispatch(login(data)); // Redux 상태 업데이트
      console.log("✅ 로그인 성공:", data);
    },
    onError: (error) => {
      console.error("❌ 로그인 실패:", error.message);
    },
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("✅ 구글 로그인 성공:", tokenResponse);
      mutation.mutate(tokenResponse.credential);
    },
    onError: (error) => {
      console.error("❌ 구글 로그인 실패!", error);
    },
  });

  return { loginWithGoogle };
};

export default useSocialLogin;

