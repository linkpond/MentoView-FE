import styled from "styled-components";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState } from "react";

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
    height: 500px;
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

const tabContents = {
    "내 정보 조회": "내 정보 조회 화면",
    "구독 관리": "구독 관리 화면",
    "비밀번호 변경": "비밀번호 변경 화면",
    "회원 탈퇴": "회원 탈퇴 화면",
};

const MyPage = () => {
    const [activeTab, setActiveTab] = useState("내 정보 조회");
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
                    <RiLogoutBoxLine className="logout" />
                    <img className="logo" src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" />
                </MyPageTab>
                <TabContentBox>
                    {tabContents[activeTab]}
                </TabContentBox>
            </MyPageTabBox>
        </MyPageBox>
    )
};

export default MyPage;