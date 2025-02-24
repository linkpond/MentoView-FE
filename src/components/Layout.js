import { Outlet, useLocation } from "react-router-dom";
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
  ${({ hasBackground }) => hasBackground && `
    background-image: url(${process.env.PUBLIC_URL}/bg2.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  `}
`;

const Layout = () => {
  const location = useLocation();
  const hasBackground = location.pathname === "/";

  return (
    <>
      <GlobalStyles />
      <LayoutContainer hasBackground={hasBackground}>
        <Nav />
        <Outlet />
        <Footer />
      </LayoutContainer>
    </>
  );
};

export default Layout;
