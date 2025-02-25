import styled from "styled-components";
import { useState } from "react";

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
    width: 300px;
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

function Certification() {
    const [certified, setCertified] = useState(false);

    function onClickCertification() {
        if (certified) return;

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
        <CButton certified={certified} onClick={onClickCertification}>
            {certified ? "본인인증 완료" : "본인인증 하기"}
        </CButton>
    );
}

const Signup = () => {
    const [certified, setCertified] = useState(false);
    return (
        <SignupBox>
            <SignupFormBox>
                <InputBox>
                    <InputTitle>이메일</InputTitle>
                    <Input />
                </InputBox>
                <InputBox>
                    <InputTitle>아이디</InputTitle>
                    <Input />
                </InputBox>
                <InputBox>
                    <InputTitle>비밀번호</InputTitle>
                    <Input />
                </InputBox>
                <Certification setCertified={setCertified} />
                {certified && <SButton>회원가입</SButton>}
            </SignupFormBox>
        </SignupBox>
    );
};

export default Signup;
