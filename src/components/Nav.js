import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useLogout from "../hooks/useLogout";
import { FiMenu, FiX } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const Navbox = styled.div`
    position: sticky;
    top: 0;
    z-index: 997;
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 200px 0px 200px;
    .logo {
        width: 150px;
        cursor: pointer;
    }
    border-bottom: 1.5px solid #aaa;
    background-color: #fff;
    @media (max-width: 1120px) {
        justify-content: center;
        padding: 0 20px;
        .logo{
            width: 120px;
            margin-left: auto;
        }
    }
`
const MenuBox = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .menu-item {
        width: fit-content;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px 20px 0px 20px;
        font-weight: bold;
        transition: all 0.15s;
        cursor: pointer;
        &:hover {
            color: var(--main-color);
        }
        .re {
            position: relative;
        }
    }
    @media (max-width: 1120px) {
        display: none;
    }
`
const AuthBox = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    .user {
        font-weight: bold;
    }
    @media (max-width: 1120px) {
        display: none;
    }
`

const AuthButton = styled.div`
    width: 70px;
    height: 33px;
    margin: 0px 10px 0px 10px;
    font-weight: bold;
    font-size: 12px;
    color: var(--main-color);
    border: 2px solid var(--main-color);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0px 0px 4px 0.5px rgb(0, 0, 0, 0.1);
    &:hover {
        background-color: var(--main-color);
        color: #fff;
    }
`
const DropdownBox = styled.div`
    position: absolute;
    top: 50px;
    width: 80px;
    height: fit-content;
    display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #ddd;
    color: initial;
    background-color: #fff;
`
const DropdownItem = styled.div`
    width: 100%;
    height: fit-content;
    padding: 6px 0px 6px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s;
    &:hover {
        background-color: var(--main-color);
        color: #fff;
    }
`
const SideBox = styled.div`
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: -3px 0 10px rgba(0, 0, 0, 0.2);
    transition: right 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    .close {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 24px;
        color: var(--main-color);
    }
    .side-auth-box {
        padding: 0px 10px;
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: start;
        .icon-box {
            width: fit-content;
            height: fit-content;
            display: flex;
            align-items: center;
            .user-icon {
                font-size: 24px;
                color: #aaa;
                margin-right: 5px;
            }
            .user {
                font-weight: bold;
            }
            margin-bottom: 10px;
        }
        .auth-btn-box {
            width: 100%;
            height: fit-content;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .auth-btn {
                cursor: pointer;
                width: 110px;
                height: 33px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                background-color: var(--main-color);
                color: #fff;
                font-weight: bold;
            }
        }
    }
    .side-item {
        cursor: pointer;
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px;
        font-size: 18px;
        font-weight: bold;
        margin-top: 15px;
    }
    .service-item {
        cursor: pointer;
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: start;
        padding-left: 30px;
        font-size: 18px;
        font-weight: bold;
        margin-top: 10px;
        display: none;
        &.open {
            display: block;
        }
    }
    .side-logo {
        margin: auto 0px 20px 0px;
        width: 130px;
    }
`;
const ToggleIcon = styled(FaAngleRight)`
    color: var(--main-color);
    font-size: 16px;
    flex-grow: initial;
    margin-left: auto;
    cursor: pointer;
    transition: transform 0.15s;
    transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
`;
const Hamburger = styled(FiMenu)`
    display: none;
    font-size: 24px;
    cursor: pointer;
    margin-left: auto;
    @media (max-width: 1120px) {
        display: block;
    }
`;

const Nav = () => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const user = useSelector(state => state.auth.user);
    const logoutMutation = useLogout();
    const [sideOpen, setSideOpen] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);

    return (
        <Navbox>
            <img className="logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" onClick={() => { navigate("/") }} />
            <MenuBox>
                <div className="menu-item" onClick={() => { navigate("/about"); window.scrollTo(0, 0); }}>About</div>
                <div className="menu-item re"
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                >Service
                    <DropdownBox isVisible={dropdownVisible}>
                        <DropdownItem onClick={() => { navigate("/service/voice"); window.scrollTo(0, 0); }}>Voice</DropdownItem>
                        <DropdownItem onClick={() => { navigate("/service/video"); window.scrollTo(0, 0); }}>Video</DropdownItem>
                    </DropdownBox>
                </div>
                <div className="menu-item" onClick={() => { navigate("/myservice"); window.scrollTo(0, 0); }}>My Service</div>
                <div className="menu-item" onClick={() => { navigate("/contactus"); window.scrollTo(0, 0); }}>Contact Us</div>
            </MenuBox>
            <AuthBox>
                {user ? (
                    <>
                        <span className="user">{user?.name} 님</span>
                        <AuthButton onClick={() => { navigate("/mypage"); window.scrollTo(0, 0); }}>Mypage</AuthButton>
                        <AuthButton onClick={() => logoutMutation.mutate()}>Logout</AuthButton>
                    </>
                ) : (
                    <>
                        <AuthButton onClick={() => { navigate("/login"); window.scrollTo(0, 0); }}>Login</AuthButton>
                        <AuthButton onClick={() => { navigate("/signup"); window.scrollTo(0, 0); }}>Signup</AuthButton>
                    </>
                )}
            </AuthBox>
            <SideBox isOpen={sideOpen}>
                <FiX className="close" onClick={() => { setSideOpen(false); }} />
                <div className="side-auth-box">
                    <div className="icon-box">
                        <FaUserCircle className="user-icon" />
                        {
                            user ? <span className="user">{user?.name} 님</span>
                                : <span className="user">로그인이 필요합니다</span>
                        }
                    </div>
                    <div className="auth-btn-box">
                        {user ? (
                            <>
                                <div className="auth-btn" onClick={() => { navigate("/mypage"); }}>MYPAGE</div>
                                <div className="auth-btn" onClick={() => { logoutMutation.mutate() }}>LOGOUT</div>
                            </>
                        ) : (
                            <>
                                <div className="auth-btn" onClick={() => { navigate("/login"); }}>LOGIN</div>
                                <div className="auth-btn" onClick={() => { navigate("/signup"); }}>SIGNUP</div>
                            </>
                        )}
                    </div>
                </div>
                <div className="side-item" onClick={() => { navigate("/about"); setSideOpen(false); }}>About</div>
                <div className="side-item" onClick={() => { setServiceOpen(!serviceOpen); }}>Service
                    <ToggleIcon isOpen={serviceOpen} />
                </div>
                <div className={`service-item ${serviceOpen ? "open" : ""}`} onClick={() => { navigate("/service/voice"); setSideOpen(false); }}>Voice</div>
                <div className={`service-item ${serviceOpen ? "open" : ""}`} onClick={() => { alert("준비중입니다.") }}>Video</div>
                <div className="side-item" onClick={() => { navigate("/myservice"); setSideOpen(false); }}>My Service</div>
                <div className="side-item" onClick={() => { navigate("/contactus"); setSideOpen(false); }}>Contact Us</div>
                <img className="side-logo" src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" onClick={() => { navigate("/") }} />
            </SideBox>
            <Hamburger onClick={() => { setSideOpen(true); }} />
        </Navbox>
    )
};

export default Nav;