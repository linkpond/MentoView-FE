import styled from "styled-components";
import LineChart from "../components/LineChart";
import SalesChart from "../components/SalesCahrt";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import DashBoard from "../components/DashBoard";
import MemberInfo from "../components/MemberInfo";

const AdminBox = styled.div`
    width: 100%;
    height: calc(100vh - 65px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eee;
    padding: 20px 200px;
    @media (max-width: 1200px) {
        padding: 20px;
    }
`
const DashBoardBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    box-shadow: 0px 2px 10px 1px rgb(0, 0, 0, 0.1);
`
const SideTab = styled.div`
    width: 250px;
    height: 100%;
    background-color: var(--main-color);
    display: flex;
    flex-direction: column;
    box-shadow: 3px 0px 10px 1px rgb(0, 0, 0, 0.2);
    @media (max-width: 1200px) {
        display: none;
    }
`
const SideTabItem = styled.div`
    cursor: pointer;
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    color: #fff;
    font-weight: bold;
    transition: all 0.15s;
    font-size: 18px;
    .icon {
        font-size: 24px;
        margin-right: 10px;
    }
    &:hover {
        background-color: #fff;
        color: var(--main-color);
    }
    &.active {
        background-color: #fff;
        color: var(--main-color);
    }
`
const DashBoardContentBox = styled.div`
    width: 100%;
    height: 100%;
    /* border: 1px solid black; */
`
const MenuBox = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto 10px 0px;
    cursor: pointer;
    @media (min-width: 1201px) {
        display: none;
    }
    background-color: #fff;
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 20px;
    color: var(--main-color);
`;

const MenuList = styled.div`
    position: absolute;
    top: 35px;
    left: 0;
    width: 140px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transform: translateY(${({ isOpen }) => (isOpen ? "0px" : "-10px")});
    transition: opacity 0.3s ease, transform 0.3s ease;
    visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
`;

const MenuItem = styled.div`
    padding: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: #555;
    &:hover {
        background-color: #f0f0f0;
    }
`;


const Admin = () => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
        return sessionStorage.getItem("isAuthenticated") === "true";
    });
    const [activeTab, setActiveTab] = useState("메인");
    const [activeMobileTab, setActiveMobileTab] = useState(false);
    const tabContents = {
        "메인": () => <DashBoard />,
        "회원관리": () => <MemberInfo />,
    };
    return (
        <AdminBox>
            {
                !isAdminAuthenticated ? (
                    <>
                        <MenuBox onClick={() => { setActiveMobileTab(!activeMobileTab); }}>
                            <FiMenu />
                            {Object.keys(tabContents).map((tab) => (
                                <MenuList isOpen={activeMobileTab}>
                                    {Object.keys(tabContents).map((tab) => (
                                        <MenuItem
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            ))}
                        </MenuBox>
                        <DashBoardBox>
                            <SideTab>
                                <SideTabItem
                                    onClick={() => setActiveTab("메인")}
                                    className={activeTab === "메인" ? "active" : ""}
                                >
                                    <FaHome className="icon" />
                                    <span className="tab-title">메인</span>
                                </SideTabItem>
                                <SideTabItem
                                    onClick={() => setActiveTab("회원관리")}
                                    className={activeTab === "회원관리" ? "active" : ""}
                                >
                                    <FaUserCircle className="icon" />
                                    <span className="tab-title">회원 관리</span>
                                </SideTabItem>
                            </SideTab>
                            <DashBoardContentBox>
                                {tabContents[activeTab]()}
                            </DashBoardContentBox>
                        </DashBoardBox>
                    </>
                ) : (
                    <>
                        <span>로그인폼</span>
                    </>
                )
            }
        </AdminBox>
    )
};

export default Admin;