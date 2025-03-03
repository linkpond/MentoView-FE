import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TestContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30px;
`;

const GoogleLoginButton = () => {
    return (
        <GoogleOAuthProvider clientId="463314275621-eqcsd957m42hse9fi7vdek59q0cen29m.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={() => {
                    console.log("로그인 성공! 쿠키에서 토큰이 자동 저장됨.");
                    window.location.reload(); // 새로고침해서 쿠키 반영
                }}
                onError={() => {
                    console.error("로그인 실패");
                }}
            />
        </GoogleOAuthProvider>
    );
};

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:8080/auth/me", {
                    withCredentials: true, // 쿠키 포함 요청
                });
                console.log(res);
                setUser(res.data);
            } catch (error) {
                console.error("사용자 정보를 가져오지 못함", error);
            }
        };

        fetchUser();
    }, []);

    return user ? <p>환영합니다, {user.name}!</p> : <p>로그인이 필요합니다.</p>;
};




const Test = () => {
    return (
        <TestContainer>
            <GoogleLoginButton />
            <UserProfile />
        </TestContainer>
    );
};

export default Test;