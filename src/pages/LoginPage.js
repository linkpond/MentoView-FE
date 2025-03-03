import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import fetchGoogleAuthUrl from "../hooks/fetchGoogleAuthUrl";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    fetchGoogleAuthUrl(); // 🔹 Google 로그인 URL 받아와서 이동
  };

  return (
    <div>
      <h2>Google 소셜 로그인</h2>
      <button onClick={handleGoogleLogin}>Google로 로그인</button>
    </div>
  );
};

export default LoginPage;

