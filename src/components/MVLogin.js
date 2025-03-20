import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice.js";
import { useDispatch } from "react-redux";
import { useUserInfo } from "../hooks/useUserInfo.js";
import styled from "styled-components";
import { useSocialPassword } from "../hooks/useSocialPassword.js";

const PasswordBox = styled.div`
    width: 100%;
    height: calc(100vh - 65px);
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 500px) {
        padding: 10px;
    }
`;

const PasswordForm = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #eee;
    border-radius: 4px;
    padding: 10px;
    .title {
        font-weight: bold;
        padding: 10px 0px;
    }
    .error {
        color: red;
        font-size: 14px;
        margin: 5px 0;
    }
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const Input = styled.input`
    width: 410px;
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
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    @media (min-width: 501px) {
        padding: 10px;
    }
    @media (max-width: 500px) {
        margin-top: 10px;
    }
`;

const PasswordBtn = styled.div`
    width: 100%;
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

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid var(--main-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    padding: 30px;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const MVLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: userInfo, refetch: fetchUserInfo, isFetching } = useUserInfo();
    const { mutate: submitPassword } = useSocialPassword();
    const [formData, setFormData] = useState({ password: "", passwordCheck: "" });
    const [ndg, setNdg] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordSet, setIsPasswordSet] = useState(false);
    const [isUserFetched, setIsUserFetched] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const ndgValue = params.get("ndg");

        if (token) {
            sessionStorage.setItem("token", token.trim());
            setNdg(ndgValue);
        }
    }, []);

    useEffect(() => {
        if ((ndg === "tu") || (ndg === "fa" && isPasswordSet)) { 
            fetchUserInfo();
            setIsUserFetched(true);
        }
    }, [ndg, isPasswordSet, fetchUserInfo]);

    useEffect(() => {
        if (userInfo && isUserFetched) {
            dispatch(setUser(userInfo));
            navigate("/");
        }
    }, [userInfo, isUserFetched, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;

        if (!passwordRegex.test(formData.password)) {
            setErrorMessage("비밀번호는 8~15자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.");
            return;
        }

        if (formData.password !== formData.passwordCheck) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        setErrorMessage("");
    }, [formData]);

    const handleSubmit = () => {
        if (errorMessage) return;
    
        const submitData = new FormData();
        submitData.append("password", formData.password);
        submitData.append("passwordCheck", formData.passwordCheck);
    
        submitPassword(submitData, {
            onSuccess: () => {
                setIsPasswordSet(true);
            },
        });
    };

    if (isFetching) {
        return (
            <PasswordBox>
                <Spinner />
            </PasswordBox>
        );
    }

    return (
        <PasswordBox>
            <PasswordForm>
                <span className="title">Mypage 접근을 위한 비밀번호를 설정해주세요</span>
                <Input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
                <Input type="password" name="passwordCheck" placeholder="비밀번호 확인" value={formData.passwordCheck} onChange={handleChange} />
                <div className="error">{errorMessage}</div>
                <ButtonBox>
                    <PasswordBtn onClick={handleSubmit}>패스워드 설정</PasswordBtn>
                </ButtonBox>
            </PasswordForm>
        </PasswordBox>
    );
};

export default MVLogin;
