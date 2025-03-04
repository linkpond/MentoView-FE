import styled, { keyframes } from "styled-components";
import { BsChevronDown } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const blink = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.3;
    }
`;

const AboutBox = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
`;

const ImageBox = styled.div`
    position: relative;
    width: 100%;
    height: 95vh;
    border: 1px solid black;
    background-image: url(${process.env.PUBLIC_URL}/iv.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5); /* 투명한 검은색 */
        z-index: 1;
    }
    .down {
        color: #fff;
        font-size: 50px;
        opacity: 0;
        animation: ${fadeIn} 1s ease-in-out 1.2s forwards, ${blink} 1.5s infinite 2.5s;
        z-index: 2;
    }
`;

const ImageTitle = styled.span`
    color: #fff;
    font-size: 36px;
    font-weight: bold;
    opacity: 0;
    animation: ${fadeIn} 1s ease-in-out forwards;
    z-index: 2;
`;

const ImageSubtitle = styled.span`
    color: #fff;
    font-size: 30px;
    margin: 30px 0px 150px 0px;
    font-weight: bold;
    opacity: 0;
    animation: ${fadeIn} 1s ease-in-out 0.5s forwards;
    z-index: 2;
`;

const MidBox = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 200px 0px 200px;
`
const MidColorTitle = styled.span`
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    color: var(--main-color);
`
const MidTitle = styled.span`
    font-size: 24px;
    font-weight: bold;
`
const ResumeBox = styled.div`
    margin: 50px 0px 50px 0px;
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .resume {
        width: 450px;
        border-radius: 8px;
    }
    .rt-box {
        width: 450px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        .title {
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
        }
    }
`
const InterviewBox = styled.div`
    margin-bottom: 50px;
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .interview {
        width: 450px;
        border-radius: 8px;
    }
    .it-box {
        width: 450px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: center;
        .title {
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
        }
    }
`
const Edge = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 15px 4px 15px;
    background-color: var(--main-color);
    border-radius: 120px;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 5px;
`
const BottomBox = styled.div`
    padding: 50px 200px 0px 200px;
    width: 100%;
    height: 350px;
    background: linear-gradient(to top, var(--main-color), white);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bt-box {
        display: flex;
        flex-direction: column;
        .bt-text {
            font-size: 32px;
            font-weight: bold;
        }
    }
`;

const BottomBtn = styled.div`
    width: fit-content;
    height: fit-content;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px 40px 10px 40px;
    font-weight: bold;
    font-size: 18px;
    background-color: #333;
    color: #fff;
    box-shadow: 0px 0px 12px 1px rgb(0, 0, 0, 0.1);
    cursor: pointer;
    transition: 0.15s;
    &:hover {
        opacity: 0.8;
    }
`

const About = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const handleButtonClick = () => {
        if (!user || !sessionStorage.getItem("token")) {
            navigate("/login");
        } else {
            navigate("/service/voice");
        }
    };
    return (
        <AboutBox>
            <ImageBox>
                <ImageTitle>막 피어난 꽃같은 당신들에게</ImageTitle>
                <ImageSubtitle>앞으로 나아갈 아름다울 미래를 서포트합니다</ImageSubtitle>
                <BsChevronDown className="down" />
            </ImageBox>
            <MidBox>
                <MidColorTitle>적은 면접 경험으로 막막한 당신</MidColorTitle>
                <MidTitle>AI가 당신의 이력서를 분석하고</MidTitle>
                <MidTitle>예상 질문과 피드백을 제공합니다</MidTitle>
                <ResumeBox>
                    <img className="resume" src={`${process.env.PUBLIC_URL}/resume.jpg`} alt="resume" />
                    <div className="rt-box">
                        <Edge>간편한 이력서 등록</Edge>
                        <span className="title">&middot; 기존의 이력서 파일을 등록해주세요</span>
                        <span className="title">&middot; AI가 당신의 이력서를 꼼꼼히 분석해요</span>
                    </div>
                </ResumeBox>
                <InterviewBox>
                    <div className="it-box">
                        <Edge>실전 면접처럼 정밀하게</Edge>
                        <span className="title">주어진 질문에 음성으로 답하면 &middot;</span>
                        <span className="title">전문적인 피드백을 전달해요 &middot;</span>
                    </div>
                    <img className="interview" src={`${process.env.PUBLIC_URL}/interview.jpg`} alt="interview" />
                </InterviewBox>
            </MidBox>
            <BottomBox>
                <div className="bt-box">
                    <span className="bt-text">다가오는 면접에 자신있게</span>
                    <span className="bt-text">MentoView로 준비하고 합격해요</span>
                </div>
                <BottomBtn onClick={handleButtonClick}>MentoView로 면접 준비하기</BottomBtn>
            </BottomBox>
        </AboutBox>
    );
};

export default About;
