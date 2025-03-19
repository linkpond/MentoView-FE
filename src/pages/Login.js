import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useSubmitLoginRequest } from "../hooks/useSubmitLoginRequest.js";

const LoginBox = styled.div`
    width: 100%;
    height: calc(100vh - 65px);
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
        width: clamp(100px, 15vw, 140px);
        cursor: pointer;
    }
    .signup {
        margin-top: 10px;
        font-size: clamp(10px, 2vw, 12px);
        font-weight: bold;
        cursor: pointer;
        color: #aaa;
        &:hover {
            color: var(--main-color);
        }
    }
`;

const LoginForm = styled.div`
    width: min(90%, 400px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #eee;
    border-radius: 4px;
    padding: 10px;
    .error {
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    border: 2px solid #eee;
    border-radius: 4px;
    margin: 10px;
    padding-left: 10px;
    outline: none;
    font-size: clamp(12px, 2.5vw, 14px);
    transition: all 0.15s;
    &:focus {
        border: 2px solid var(--main-color);
    }
    &::placeholder {
        font-size: clamp(12px, 2.5vw, 14px);
    }
`;

const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const LoginBtn = styled.div`
    flex: 1;
    height: 40px;
    border-radius: 4px;
    border: 2px solid var(--main-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-color: #fff;
    color: var(--main-color);
    cursor: pointer;
    font-size: clamp(14px, 3vw, 16px);
    transition: all 0.2s;
    &:hover {
        background-color: var(--main-color);
        color: #fff;
    }
`;
const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid var(--main-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 40px;
    padding: 30px;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const Login = () => {
    const navigate = useNavigate();
    const { mutate: login, isLoading, error } = useSubmitLoginRequest();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormLogin = () => {
        login(formData);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleFormLogin();
        }
    };
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.REACT_APP_API_BASE_URL}/api/oauth2/authorization/google`.replace(/([^:]\/)\/+/g, "$1");
    };

    if (isLoading) {
        return (
            <LoginBox>
                <Spinner />
            </LoginBox>
        );
    }

    return (
        <LoginBox>
            <LoginForm>
                <img className="logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" onClick={() => { navigate("/") }} />
                <Input type="text" name="email" placeholder="EMAIL" onChange={handleChange} />
                <Input type="password" name="password" placeholder="PW" onChange={handleChange} onKeyDown={handleKeyDown} />
                <div className="error">{error && "아이디 혹은 비밀번호가 일치하지 않습니다."}</div>
                <ButtonBox>
                    <LoginBtn onClick={handleFormLogin} disabled={isLoading}>LOGIN</LoginBtn>
                    <LoginBtn onClick={handleGoogleLogin}>SOCIAL LOGIN</LoginBtn>
                </ButtonBox>
                <span className="signup" onClick={() => { navigate("/signup") }}>SIGNUP</span>
            </LoginForm>
        </LoginBox>
    );
};

export default Login;