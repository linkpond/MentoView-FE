import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSubmitLoginRequest } from "../hooks/useSubmitLoginRequest.js";
import { setUser } from "../redux/authSlice.js";

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
        margin: 5px 0;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        color: #aaa;
        &:hover {
            color: var(--main-color);
        }
    }
`;

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
`;

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
`;

const ButtonBox = styled.div`
    padding: 10px;
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

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
`;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { mutate: login, isLoading, error } = useSubmitLoginRequest();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormLogin = () => {
        login(formData);
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <LoginBox>
            <LoginForm>
                <img className="logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" onClick={() => { navigate("/") }} />
                <Input type="text" name="email" placeholder="ID" onChange={handleChange} />
                <Input type="password" name="password" placeholder="PW" onChange={handleChange} />
                <ButtonBox>
                    <LoginBtn onClick={handleFormLogin} disabled={isLoading}>Login</LoginBtn>
                    <LoginBtn onClick={handleGoogleLogin}>Social Login</LoginBtn>
                </ButtonBox>
                {error && <div style={{ color: "red" }}>❌ {error.message}</div>}
                <span className="signup" onClick={() => { navigate("/signup") }}>Signup</span>
            </LoginForm>
        </LoginBox>
    );
};

export default Login;