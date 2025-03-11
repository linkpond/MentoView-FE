import styled from "styled-components";
import { RiLogoutBoxLine } from "react-icons/ri";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import Subscription from "../components/Subscription";
import Payment from "../components/Payment";
import ChangePassword from "../components/ChangePassword";
import DeleteAccount from "../components/DeleteAccount";

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

const MyPage = () => {
    const [activeTab, setActiveTab] = useState("구독 관리");
    const tabContents = {
        "구독 관리": () => <Subscription />,
        "결제 내역": () => <Payment />,
        "비밀번호 변경": () => { return <ChangePassword />; },
        "회원 탈퇴": () => { return <DeleteAccount />; },
    };
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
    };

    return (
        <MyPageBox>
            <MyPageTabBox>
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
                    <img className="logo" src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" />
                </MyPageTab>
                <TabContentBox>
                    {tabContents[activeTab] && tabContents[activeTab]()}
                </TabContentBox>

            </MyPageTabBox>
        </MyPageBox>
    );
};

export default MyPage;