import { useState } from "react";
import useModifyPassword from "../hooks/useModifyPassword";
import styled from "styled-components";

const TabContentItem = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

const ChangePassword = () => {
    const modifyPasswordMutation = useModifyPassword();
    const [passwords, setPasswords] = useState({
        beforePassword: "",
        afterPassword: "",
        afterPasswordCheck: "",
    });
    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        modifyPasswordMutation.mutate(passwords, {
            onSuccess: (data) => {
                alert("비밀번호 변경 성공!");
            },
            onError: (error) => {
                alert(error.response?.data || "비밀번호 변경 실패");
            },
        });
    };
    return (
        <TabContentItem>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    name="beforePassword"
                    placeholder="현재 비밀번호"
                    value={passwords.beforePassword}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="afterPassword"
                    placeholder="새 비밀번호"
                    value={passwords.afterPassword}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="afterPasswordCheck"
                    placeholder="새 비밀번호 확인"
                    value={passwords.afterPasswordCheck}
                    onChange={handleChange}
                />
                <button type="submit">비밀번호 변경</button>
            </form>
        </TabContentItem>
    );
};

export default ChangePassword;