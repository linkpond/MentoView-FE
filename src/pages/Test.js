// import axios from "axios";
// import styled from "styled-components";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TestContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30px;
`

const Test = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const fetchUserData = async () => {
        console.log("🔄 사용자 정보를 다시 가져옵니다.");
        // 🔥 기존 Redux 상태(user)를 활용하여 자동 갱신됨
        try {
            const response = await fetch("http://localhost:8080/api/auth/me", {
                credentials: "include", // 쿠키 포함
            });
            const data = await response.json();
            console.log("🔄 사용자 정보 갱신:", data);
            // Redux 상태 업데이트가 필요하면 여기서 dispatch 호출
            return data;

        } catch (error) {
            console.error("❌ 사용자 데이터 가져오기 실패:", error);
            return null;
        }
    };


    const handleSocialLogin = () => {
        const popup = window.open(
            "http://localhost:8080/oauth2/authorization/google",
            "Google Login",
            "width=600,height=600"
        );
    
        const interval = setInterval(() => {
            if (!popup || popup.closed) {
                clearInterval(interval);
                console.log("✅ 로그인 팝업이 닫혔습니다. 사용자 데이터를 가져옵니다.");
                fetchUserData(); // 🔹 사용자 정보 갱신
                navigate("/");
            }
        }, 1000);
    };
    

    useEffect(() => {
        // const checkUserStatus = async () => {
        //     const userData = await fetchUserData();
        //     if (userData) {
        //         console.log("✅ 로그인 완료, 메인 페이지로 이동!");
        //         // navigate("/"); // ✅ 로그인 후 메인 페이지로 이동
        //     }
        // };

        // checkUserStatus();
        
    }, []);
    return (
        <TestContainer>
            <button onClick={handleSocialLogin}>123</button>
        </TestContainer>
    )
};

export default Test;