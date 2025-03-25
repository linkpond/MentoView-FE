import { useEffect, useState } from "react";
import { useModifyPassword } from "../hooks/useModifyPassword";
import styled from "styled-components";

const TabContentItem = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    .error {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        color: red;
    }
`;

const InputBox = styled.div`
    width: 450px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    @media (max-width: 600px) {
        width: 100%;
    }
`;

const InputTitle = styled.span`
    font-weight: bold;
    @media (max-width: 600px) {
        font-size: 12px;
    }
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
    @media (max-width: 600px) {
        width: 70%;
    }
`;
const ChangeButton = styled.button`
    width: 450px;
    height: 40px;
    border: 2px solid var(--main-color);
    border-radius: 4px;
    background-color: var(--main-color);
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    margin-top: 10px;
    transition: all 0.15s;
    &:hover {
        opacity: 0.7;
    }
    @media (max-width: 600px) {
        width: 100%;
    }
`;

const ChangePassword = () => {
    const modifyPasswordMutation = useModifyPassword();
    const [errorMessage, setErrorMessage] = useState("");
    const [passwords, setPasswords] = useState({
        beforePassword: "",
        afterPassword: "",
        afterPasswordCheck: "",
    });

    const handleChange = (e) => {
        setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^~+=()[\]#-])[A-Za-z\d@$!%*?&^~+=()[\]#-]{8,15}$/;
        const forbiddenChars = /[^A-Za-z\d@$!%*?&^~+=()[\]#-]/;

        if (forbiddenChars.test(passwords.beforePassword)) {
            setErrorMessage("현재 비밀번호에 허용되지 않은 특수문자가 포함되어 있습니다.");
            return;
        }

        if (!passwordRegex.test(passwords.beforePassword)) {
            setErrorMessage("현재 비밀번호는 8~15자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.");
            return;
        }

        if (forbiddenChars.test(passwords.afterPassword)) {
            setErrorMessage("새 비밀번호에 허용되지 않은 특수문자가 포함되어 있습니다.");
            return;
        }

        if (!passwordRegex.test(passwords.afterPassword)) {
            setErrorMessage("새 비밀번호는 8~15자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.");
            return;
        }

        if (passwords.afterPassword && passwords.afterPassword !== passwords.afterPasswordCheck) {
            setErrorMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        setErrorMessage("");
    }, [passwords]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        modifyPasswordMutation.mutate(passwords, {
            onSuccess: (data) => {
                alert("비밀번호 변경 성공!");
                setPasswords({ beforePassword: "", afterPassword: "", afterPasswordCheck: "" });
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message || "비밀번호 변경 실패";
                alert(errorMessage);
            },
        });
    };

    return (
        <TabContentItem>
            <InputBox>
                <InputTitle>현재 비밀번호</InputTitle>
                <Input type="password" name="beforePassword" placeholder="현재 비밀번호" value={passwords.beforePassword} onChange={handleChange} />
            </InputBox>
            <InputBox>
                <InputTitle>새 비밀번호</InputTitle>
                <Input type="password" name="afterPassword" placeholder="새 비밀번호" value={passwords.afterPassword} onChange={handleChange} />
            </InputBox>
            <InputBox>
                <InputTitle>새 비밀번호 확인</InputTitle>
                <Input type="password" name="afterPasswordCheck" placeholder="새 비밀번호 확인" value={passwords.afterPasswordCheck} onChange={handleChange} />
            </InputBox>
            <div className="error">{errorMessage}</div>
            <ChangeButton onClick={handleSubmit} disabled={!!errorMessage}>
                비밀번호 변경
            </ChangeButton>
        </TabContentItem>
    );
};

export default ChangePassword;
