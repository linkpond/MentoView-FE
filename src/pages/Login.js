import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSocialLogin from "../hooks/useSocialLogin.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
const LoginBox = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
        width: 140px;
    }
    .signup {
        margin: 5px 0px 5px 0px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        color: #aaa;
        &:hover {
            color: var(--main-color);
        }
    }
`
const LoginForm = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #eee;
    border-radius: 4px;
    padding: 10px;
`
const Input = styled.input`
    width: 300px;
    height: 40px;
    border: 2px solid #eee;
    border-radius: 4px;
    margin: 10px;
    padding-left: 10px;
    outline: none;
    font-size: 13px;
    transition: all 0.15s;
    &:focus {
        border: 2px solid var(--main-color);
    }
    &::placeholder {
        font-size: 13px;
    }
`
const ButtonBox = styled.div`
    padding: 10px;
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const LoginBtn = styled.div`
    width: 140px;
    height: 34px;
    border-radius: 4px;
    border: 2px solid var(--main-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-color: #fff;
    color: var(--main-color);
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        background-color: var(--main-color);
        color: #fff;
    }
` 

const Login = () => {
    const navigate = useNavigate();
    const socialLogin = useSocialLogin();

    const handleSocialLogin = () => {
        socialLogin.loginWithGoogle();
    };
    const user = useSelector((state) => state.auth.user);
    
    useEffect(() => {
        console.log("🔍 현재 user 상태:", user);
        if (user) {
          console.log("✅ 로그인 성공! 팝업 닫기");
          if (window.opener) {
            window.close();
          }
        }
      }, [user]);

    return (
        <LoginBox>
            <LoginForm>
            <img className="logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" onClick={() => { navigate("/") }} />
                <Input type="text" placeholder="ID" />
                <Input type="password" placeholder="PW" />
                <ButtonBox>
                    <LoginBtn>Login</LoginBtn>
                    <LoginBtn onClick={handleSocialLogin}>Social Login</LoginBtn>
                </ButtonBox>
                <span className="signup" onClick={() => { navigate("/signup")}}>Signup</span>
                <div>{user ? "LOGIN 성공 ": "LOGIN 실패" }</div>
            </LoginForm>
        </LoginBox>
    )
};

export default Login;