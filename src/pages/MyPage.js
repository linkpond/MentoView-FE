import styled from "styled-components";
import { RiLogoutBoxLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import Subscription from "../components/Subscription";
import Payment from "../components/Payment";
import ChangePassword from "../components/ChangePassword";
import DeleteAccount from "../components/DeleteAccount";
import useMyPageAuth from "../hooks/useMypageAuth";
import useLogout from "../hooks/useLogout";

// Mypage
const MyPageBox = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #eee;
    padding: 0px 200px 0px 200px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const MyPageTabBox = styled.div`
    width: 1000px;
    height: 550px;
    background-color: #fff;
    display: flex;
    border-radius: 8px;
    box-shadow: 0px 2px 10px 1px rgb(0, 0, 0, 0.1);
    overflow: hidden;
`
const MyPageTab = styled.div`
    position: relative;
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1.5px solid #ddd;
    .logout {
        position: absolute;
        bottom: 10px;
        right: 10px;
        cursor: pointer;
        color: var(--main-color);
        font-size: 30px;
        transition: all 0.15s;
        &:hover {
            opacity: 0.7;
        }
    }
    .logo {
        width: 100px;
        position: absolute;
        bottom: 10px;
        left: 15px;
    }
`
const TabItem = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 15px;
    font-size: 14px;
    font-weight: bold;
    border: 2px solid transparent;
    cursor: pointer;
    background-color: ${({ active }) => (active ? "var(--main-color)" : "transparent")};
    color: ${({ active }) => (active ? "#fff" : "inhelit")};
    &:hover {
        border: 2px solid var(--main-color);
    }
`
const TabContentBox = styled.div`
    width: 750px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
// Password
const PasswordBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        font-size: 14px;
    }
`;

const Input = styled.input`
    width: 410px;
    height: 35px;
    border: 2px solid #eee;
    border-radius: 4px;
    margin: 10px 10px 0px 10px;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const PasswordBtn = styled.div`
    width: 100%;
    height: 35px;
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
    margin-bottom: 40px;
    padding: 30px;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const MyPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem("isAuthenticated") === "true";
    });
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [activeTab, setActiveTab] = useState("구독 관리");
    const mutation = useMyPageAuth();
    const logoutMutation = useLogout();

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;
        if (password && !passwordRegex.test(password)) {
            setErrorMessage("비밀번호는 8~15자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.");
        } else {
            setErrorMessage("");
        }
    }, [password]);

    const handleSubmit = () => {
        if (!password.trim()) {
            setErrorMessage("비밀번호를 입력해주세요");
            return;
        }

        if (errorMessage) {
            return;
        }

        mutation.mutate(password, {
            onSuccess: () => {
                setIsAuthenticated(true);
                sessionStorage.setItem("isAuthenticated", "true");
            },
            onError: () => {
                setErrorMessage("비밀번호가 일치하지 않습니다.");
            }
        });
    };

    const handleLogout = () => {
        logoutMutation.mutate();
        setIsAuthenticated(false);
    };

    const tabContents = {
        "구독 관리": () => <Subscription />,
        "결제 내역": () => <Payment />,
        "비밀번호 변경": () => <ChangePassword />,
        "회원 탈퇴": () => <DeleteAccount />,
    };
    
    if (mutation.isLoading) {
        return (
            <MyPageBox>
                <Spinner />
            </MyPageBox>
        );
    }

    return (
        <MyPageBox>
            <MyPageTabBox>
                {isAuthenticated ? (
                    <>
                        <MyPageTab>
                            {Object.keys(tabContents).map((tab) => (
                                <TabItem
                                    key={tab}
                                    active={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </TabItem>
                            ))}
                            <RiLogoutBoxLine className="logout" onClick={handleLogout} />
                            <img className="logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
                        </MyPageTab>
                        <TabContentBox>
                            {tabContents[activeTab] && tabContents[activeTab]()}
                        </TabContentBox>
                    </>
                ) : (
                    <PasswordBox>
                        <PasswordForm>
                            <div className="error">{errorMessage}</div>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange}
                            />
                            <ButtonBox>
                                <PasswordBtn onClick={handleSubmit} disabled={mutation.isLoading || errorMessage}>
                                    {mutation.isLoading ? "Verifying..." : "비밀번호 확인"}
                                </PasswordBtn>
                            </ButtonBox>
                        </PasswordForm>
                    </PasswordBox>
                )}
            </MyPageTabBox>
        </MyPageBox>
    );
};

export default MyPage;

