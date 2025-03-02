import styled from "styled-components";
import { useState } from "react";
import { useSignup } from "../hooks/useSignupForm";
import { useNavigate } from "react-router-dom";


const SignupBox = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SignupFormBox = styled.div`
    width: fit-content;
    height: fit-content;
    background-color: #fff;
    border: 2px solid #eee;
    padding: 20px;
    border-radius: 4px;
    .error-msg {
        margin-top: 10px;
        /* border: 1px solid black; */
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f05650;
        font-weight: bold;
        font-size: 14px;
    }
`;

const InputBox = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`;

const InputTitle = styled.span`
    margin-right: 40px;
`;

const Input = styled.input`
    width: 350px;
    height: 40px;
    border: 2px solid #eee;
    border-radius: 4px;
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

const CButton = styled.button`
    width: 100%;
    height: 40px;
    border: 2px solid ${({ certified }) => (certified ? "red" : "var(--main-color)")};
    border-radius: 4px;
    background-color: ${({ certified }) => (certified ? "#fff" : "var(--main-color)")};
    cursor: ${({ certified }) => (certified ? "default" : "pointer")};
    color: ${({ certified }) => (certified ? "red" : "#fff")};
    font-weight: bold;
    margin-top: 10px;
    transition: all 0.15s;
    &:hover {
        opacity: ${({ certified }) => (certified ? "1" : "0.7")};
    }
`;
const SButton = styled.button`
    width: 100%;
    height: 40px;
    border: 2px solid ${({ certified }) => (certified ? "red" : "var(--main-color)")};
    border-radius: 4px;
    background-color: ${({ certified }) => (certified ? "#fff" : "var(--main-color)")};
    cursor: ${({ certified }) => (certified ? "default" : "pointer")};
    color: ${({ certified }) => (certified ? "red" : "#fff")};
    font-weight: bold;
    margin-top: 10px;
    transition: all 0.15s;
    &:hover {
        opacity: 0.7;
    }
`;

function Certification({ certified, setCertified }) {
    function onClickCertification() {
        const { IMP } = window;
        IMP.init('imp65666422');

        const data = {
            merchant_uid: `mid_${new Date().getTime()}`,
            company: '아임포트',
            name: '홍길동',
            phone: '01012341234',
        };

        IMP.certification(data, function (response) {
            const { success, error_msg } = response;
            if (success) {
                alert('본인인증 성공');
                setCertified(true);
            } else {
                alert(`본인인증 실패: ${error_msg}`);
            }
        });
    }

    return (
        <CButton
            certified={certified}
            onClick={!certified ? onClickCertification : undefined}
            disabled={certified}
        >
            {certified ? "본인인증 완료" : "본인인증 하기"}
        </CButton>

    );
}


const Signup = () => {
    const [certified, setCertified] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const { mutate: signup, isLoading } = useSignup();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage("");

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setErrorMessage("올바른 이메일 형식이 아닙니다.");
            }
        }

        if (name === "password") {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;
            if (!passwordRegex.test(value)) {
                setErrorMessage("비밀번호는 8~15자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.");
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = () => {
        setErrorMessage("");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;

        if (!certified) {
            alert("본인 인증이 필요합니다.");
            return;
        }

        if (!emailRegex.test(formData.email)) {
            setErrorMessage("올바른 이메일 형식이 아닙니다.");
            return;
        }

        if (!passwordRegex.test(formData.password)) {
            setErrorMessage("비밀번호는 8~15자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.");
            return;
        }

        signup(formData, {
            onSuccess: (data) => {
                alert("회원가입이 완료되었습니다");
                navigate("/login");
            },
            onError: (err) => {
                if (err.response?.data?.message?.includes("Duplicate entry")) {
                    setErrorMessage("이메일이 중복되었습니다.");
                } else {
                    setErrorMessage("회원가입 중 오류가 발생했습니다.");
                }
            },
        });
    };

    return (
        <SignupBox>
            <SignupFormBox>
                <InputBox>
                    <InputTitle>이름</InputTitle>
                    <Input name="name" value={formData.name} onChange={handleChange} />
                </InputBox>
                <InputBox>
                    <InputTitle>이메일</InputTitle>
                    <Input name="email" value={formData.email} onChange={handleChange} />
                </InputBox>
                <InputBox>
                    <InputTitle>비밀번호</InputTitle>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                </InputBox>
                <div className="error-msg">{errorMessage}</div>
                <Certification certified={certified} setCertified={setCertified} />
                <SButton onClick={handleSignup} disabled={isLoading}>
                    {isLoading ? '가입 중...' : '회원가입'}
                </SButton>
            </SignupFormBox>
        </SignupBox>
    );
};

export default Signup;
