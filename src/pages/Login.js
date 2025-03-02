import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSocialLogin from "../hooks/useSocialLogin.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "../hooks/useFormLogin.js";
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
    const { loginWithGoogle } = useSocialLogin();
    const { mutate: login, isLoading, error } = useLogin();
    const user = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormLogin = () => {
        login(formData, {
            onSuccess: (data) => {
                console.log("✅ 로그인 성공:", data);
            },
            onError: (err) => {
                console.error("❌ 로그인 실패:", err.response?.data || err.message);
            },
        });
    };

    useEffect(() => {
        if (user) {
            console.log("✅ 로그인 완료, 메인 페이지로 이동!");
            navigate("/");
        }
    }, [user]);

    return (
        <LoginBox>
            <LoginForm>
                <img className="logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" onClick={() => { navigate("/") }} />
                <Input type="text" name="email" placeholder="ID" onChange={handleChange} />
                <Input type="password" name="password" placeholder="PW" onChange={handleChange} />
                <ButtonBox>
                    <LoginBtn onClick={handleFormLogin} disabled={isLoading}>Login</LoginBtn>
                    <LoginBtn onClick={loginWithGoogle}>Social Login</LoginBtn>
                </ButtonBox>
                {error && <div style={{ color: "red" }}>❌ {error.message}</div>}
                <span className="signup" onClick={() => { navigate("/signup") }}>Signup</span>
                <div>{user ? "LOGIN 성공 " : "LOGIN 실패"}</div>
            </LoginForm>
        </LoginBox>
    )
};

export default Login;