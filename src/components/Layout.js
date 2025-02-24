import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Nav from "./Nav";
import Footer from "./Footer";

const LayoutContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url("bg2.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const Layout = () => {
  return (
    <>
      <GlobalStyles />
      <LayoutContainer>
        <Nav/>
        <Outlet />
        <Footer/>
      </LayoutContainer>
    </>
  );
};

export default Layout;
