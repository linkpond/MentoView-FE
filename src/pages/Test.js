import styled from "styled-components";
import { useSelector } from "react-redux";
const TestContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #aaa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30px;
`;

const Test = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <TestContainer>
            {user?.email || "No email available"}
            {user?.role}
        </TestContainer>
    );
};

export default Test;