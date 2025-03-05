import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/authSlice"
const Navbox = styled.div`
    position: sticky;
    top: 0;
    z-index: 997;
    width: 100%;
    height: fit-content;
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
`
const AuthBox = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
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

const Nav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const user = useSelector(state => state.auth.user);

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
    };

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
                        <span>{user.email}님 환영합니다</span>
                        <AuthButton onClick={handleLogout}>Logout</AuthButton>
                    </>
                ) : (
                    <>
                        <AuthButton onClick={() => { navigate("/login"); window.scrollTo(0, 0); }}>Login</AuthButton>
                        <AuthButton onClick={() => { navigate("/signup"); window.scrollTo(0, 0); }}>Signup</AuthButton>
                    </>
                )}
            </AuthBox>
        </Navbox>
    )
};

export default Nav;