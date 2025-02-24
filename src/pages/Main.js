import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MainBox = styled.div`
    position: relative;
    width: 100%;
    min-height: 98vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(0, 0, 0, 0.4);
`
const Title = styled.span`
    position: absolute;
    top: 20%;
    color: #fff;
    font-weight: bold;
    font-size: 36px;
    opacity: 0;
    animation: ${fadeIn} 0.8s ease-out forwards;
`;

const SubTitle = styled.span`
    position: absolute;
    top: 30%;
    color: #fff;
    font-weight: bold;
    font-size: 30px;
    opacity: 0;
    animation: ${fadeIn} 0.8s ease-out 0.5s forwards; /* 0.5초 딜레이 */
`;

const StartBtn = styled.div`
    position: absolute;
    bottom: 30%;
    width: fit-content;
    height: fit-content;
    border: 2.5px solid var(--main-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--main-color);
    font-weight: bold;
    font-size: 20px;
    border-radius: 8px;
    padding: 18px 40px 18px 40px;
    transition: all 0.15s;
    box-shadow: 0px 0px 10px 1px rgb(255, 255, 255, 0.5);
    cursor: pointer;
    &:hover {
        background-color: var(--main-color);
        color: #fff;
    }
`

const Main = () => {
    return (
        <MainBox>
            <Title className="title">면접이 두려우신가요?</Title>
            <SubTitle className="sub-title">혁신적인 AI 면접을 경험해보세요</SubTitle>
            <StartBtn>MentoView로 시작하기</StartBtn>
        </MainBox>
    )
};

export default Main;