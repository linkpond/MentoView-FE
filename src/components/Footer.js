import styled from "styled-components";

const FooterBox = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-color);
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 2px 0px 2px 0px;
`

const Footer = () => {
    return (
        <FooterBox>Copyright © 2025 MentoView. All rights reserved.</FooterBox>
    )
};

export default Footer;