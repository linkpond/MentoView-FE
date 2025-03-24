import styled from "styled-components";
import { useState } from "react";
import { useSignup } from "../hooks/useSignupForm";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";


const SignupBox = styled.div`
    width: 100%;
    height: calc(100vh - 65px);
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 650px) {
        padding: 10px;
    }
`;

const SignupFormBox = styled.div`
    width: 550px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border: 2px solid #eee;
    padding: 20px;
    border-radius: 4px;
    .error-msg {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f05650;
        font-weight: bold;
        font-size: 14px;
    }
    .check-box {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        margin-right: auto;
        .check {
            cursor: pointer;
            font-size: 20px;
            margin-right: 10px;
            color: var(--main-color);
            &.none {
                color: #ddd;
            }
        }
    }
    .info-box {
        padding: 10px;
        width: 100%;
        height: 100px;
        overflow-y: auto;
        border: 2px solid #ddd;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        font-weight: bold;
        .info-header {
            font-size: 20px;
            margin-bottom: 20px;
        }
        .info-text {
            font-weight: initial;
            margin-bottom: 10px;
        }
        .info-sub-num {
            margin-bottom: 10px;
        }
        .info-num {
            font-size: 16px;
            margin-bottom: 5px;
        }
    }
    @media (max-width: 650px) {
        width: 400px;
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
    @media (max-width: 650px) {
        margin-right: 10px;
        font-size: 12px;
        font-weight: bold;
    }
`;

const Input = styled.input`
    width: 350px;
    height: 35px;
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
    @media (max-width: 650px) {
        width: 230px;
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
    margin-top: 20px;
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
        const iamportCode = process.env.REACT_APP_IAMPORT_CODE;

        if (!iamportCode) {
            console.error("아임포트 코드가 설정되지 않았습니다.");
            return;
        }

        IMP.init(iamportCode);

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
    const [agree, setAgree] = useState(false);
    const [certified, setCertified] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const { mutate: signup, isLoading } = useSignup();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage("");

        if (name === "email") {
            if (!emailRegex.test(value)) {
                setErrorMessage("올바른 이메일 형식이 아닙니다.");
            }
        }

        if (name === "password") {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;
            if (!passwordRegex.test(value)) {
                setErrorMessage("비밀번호는 8~15자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.");
            }
            if (confirmPassword && value !== confirmPassword) {
                setErrorMessage("비밀번호가 일치하지 않습니다.");
            }
            setFormData({ ...formData, password: value });
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
            if (value !== formData.password) {
                setErrorMessage("비밀번호가 일치하지 않습니다.");
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSignup = () => {
        setErrorMessage("");
        if (!agree) {
            alert("개인정보 수집 및 이용에 동의하셔야 합니다.");
            return;
        }
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
        if (formData.password !== confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        signup(formData, {
            onSuccess: () => {
                alert("회원가입이 완료되었습니다.");
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
                <InputBox>
                    <InputTitle>비밀번호 확인</InputTitle>
                    <Input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} />
                </InputBox>
                <div className="error-msg">{errorMessage}</div>
                <div className="check-box">
                    {
                        agree
                            ? <FaCheckCircle className="check" onClick={() => { setAgree(!agree) }} />
                            : <FaRegCheckCircle className="check none" onClick={() => { setAgree(!agree) }} />
                    }
                    <span className="check-title">개인정보 수집 및 이용 동의</span>
                </div>
                <div className="info-box">
                    <span className="info-header">개인정보 수집 및 이용 동의서</span>
                    <span className="info-text">Mentoview는 개인정보보호법에 따라 회원가입 및 서비스 이용을 위해 필요한 최소한의 개인정보를 수집하며, 아래 내용을 자세히 읽은 후 동의해 주시기 바랍니다.</span>
                    <span className="info-num">1. 수집하는 개인정보</span>
                    <span className="info-text">이용자는 회원가입 없이도 Mentoview의 일부 서비스를 이용할 수 있습니다. 그러나 회원제 서비스 이용을 위해서는 아래와 같은 개인정보를 수집합니다.</span>
                    <span className="info-sub-num">(1) 회원가입 시 수집하는 개인정보</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;필수 항목: 고객 이름, 이메일, 비밀번호</span>
                    <span className="info-sub-num">(2) 본인인증 시 수집하는 개인정보</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;본인 인증 과정에서 이름, 휴대전화번호, 간편 인증 정보 등을 수집할 수 있습니다.</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;단, 본인 인증은 포트원 API를 이용하여 O/X 여부만 확인하며, 해당 정보를 DB에 저장하지 않습니다.</span>
                    <span className="info-sub-num">(3) 결제 시 수집하는 개인정보</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;카카오페이 결제 시 QR 코드를 이용한 결제 및 빌링키를 저장합니다.</span>
                    <span className="info-num">2. 개인정보의 이용 목적</span>
                    <span className="info-text">Mentoview는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;회원가입 의사 확인 및 서비스 제공</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;본인 인증 및 서비스 보안 강화</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;결제 처리 및 정기결제 관리</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;고객 문의 대응 및 서비스 개선</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;법적 의무 준수</span>
                    <span className="info-num">3. 개인정보의 보관 및 이용 기간</span>
                    <span className="info-text">Mentoview는 원칙적으로 회원 탈퇴 시 지체 없이 개인정보를 파기합니다. 다만, 관련 법령에 따라 일정 기간 동안 정보를 보관해야 하는 경우에는 해당 기간 동안 보관 후 삭제합니다.</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;계약 또는 청약철회 등에 관한 기록: 5년</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;대금 결제 및 재화 등의 공급에 관한 기록: 5년</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;소비자 불만 또는 분쟁 처리에 관한 기록: 3년</span>
                    <span className="info-text">&nbsp;&middot;&nbsp;로그인 기록(통신비밀보호법): 3개월</span>
                    <span className="info-num">4. 개인정보 수집 및 이용 동의를 거부할 권리</span>
                    <span className="info-text">이용자는 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 단, 필수 항목에 대한 동의를 거부할 경우 회원가입 및 서비스 이용이 제한될 수 있습니다.</span>
                </div>
                <Certification certified={certified} setCertified={setCertified} />
                <SButton onClick={handleSignup} disabled={isLoading}>
                    {isLoading ? '가입 중...' : '회원가입'}
                </SButton>
            </SignupFormBox>
        </SignupBox>
    );
};

export default Signup;
