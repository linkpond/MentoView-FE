import { Outlet } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";

const LayoutContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Layout = () => {
  return (
    <>
      <GlobalStyles />
      <LayoutContainer>
        <Outlet />
      </LayoutContainer>
    </>
  );
};

export default Layout;
