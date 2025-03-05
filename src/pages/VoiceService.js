import { useState } from "react";
import styled from "styled-components";
import { FaRegFilePdf } from "react-icons/fa6";

// MainContainer
const VoiceServiceBox = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`
// Progress
const ProgressBox = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ProgressLine = styled.div`
    position: absolute;
    top: 16px;
    left: 29px;
    width: ${({ progress }) => `${(progress - 1) * 80}px`};
    height: 2px;
    background-color: var(--main-color);
    transform: translateY(-50%);
    transition: width 0.3s ease-in-out;
`;

const ProgressItem = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0px 10px 0px 10px;
    .num {
        transition: all 0.5s;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid var(--main-color);
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 5px;
        background-color: ${({ active }) => (active ? "var(--main-color)" : "white")};
        color: ${({ active }) => (active ? "white" : "inherit")};
    }
    .text {
        font-weight: bold;
        font-size: 12px;
    }
`

// ShowArea
const ContentBox = styled.div`
    width: 1000px;
    height: 550px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 10px 1px rgb(0, 0, 0, 0.1);
`

const SliderBox = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

const SliderWrapper = styled.div`
    display: flex;
    width: 400%;
    height: 100%;
    transition: transform 0.5s ease-in-out;
    transform: ${({ progress }) => `translateX(-${(progress - 1) * 25}%)`}; 
`;

const SliderItem = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
`;

// Item-Resume
const ResumeBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .re-outer {
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        border: 2px solid #eee;
        padding: 5px 10px 5px 10px;
        border-radius: 4px;
        box-shadow: 0px 4px 8px 0.1px rgb(0, 0, 0, 0.1);
        .edge {
            position: absolute;
            top: -40px;
            left: 0;
            width: fit-content;
            height: fit-content;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            .icon {
                font-size: 24px;
                margin-right: 5px;
            }
            .edge-title {
                font-size: 16px;
                padding-top: 4px;
            }
        }
    }
`

const ResumeItem = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border: 2px solid #eee;
    border-radius: 4px;
    padding: 10px 15px 10px 15px;
    margin: 5px 0px 5px 0px;
    cursor: pointer;
    .ri-title {
        font-size: 14px;
    }
    &:hover {
        border: 2px solid var(--main-color);
    }
`

const Overlay = styled.div`
    z-index: 998;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: ${({ $visible }) => ($visible ? "1" : "0")};
    pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
    transition: opacity 0.3s ease-in-out;
`;

const ResumeModal = styled.div`
    position: fixed;
    top: 40%;
    z-index: 999;
    width: 350px;
    height: fit-content;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    box-shadow: 0px 0px 4px 1px rgba(255, 255, 255);
    background-color: #fff;
    opacity: ${({ $visible }) => ($visible ? "1" : "0")};
    transform: ${({ $visible }) => ($visible ? "scale(1)" : "scale(0.95)")};
    pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    .resume-title {
        color: #aaa;
    }
    .real {
        font-weight: bold;
        font-size: 16px;
        margin: 20px 0px 20px 0px;
    }
    .btn-box {
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: end;
    }
`;

const XBtn = styled.div`
    border-radius: 4px;
    background-color: #fff;
    color: #f05650;
    border: 2px solid #f05650;
    padding: 4px 10px 4px 10px;
    margin-left: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.15s;
    &:hover {
        background-color: #f05650;
        color: #fff;
    }
`

const OkBtn = styled(XBtn)`
    color: var(--main-color);
    border: 2px solid var(--main-color);
    &:hover {
        background-color: var(--main-color);
        color: #fff;
    }
`

// Item-Create-Question
const SpinBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .spin-title {
        margin-top: 10px;
        font-size: 20px;
    }
    .iv-title {
        font-size: 30px;
    }
    .iv-btn {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 4px;
        background-color: var(--main-color);
        color: #fff;
        transition: all 0.15s;
        padding: 10px 25px 10px 25px;
        box-shadow: 0px 1px 4px 1px rgb(0, 0, 0, 0.1);
        font-size: 24px;
        font-weight: bold;
        margin-top: 50px;
        &:hover {
            opacity: 0.7;
        }
    }
`

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid var(--main-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 40px;
    padding: 30px;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Item-Interview
const InterviewBox = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`
const InterviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 500%;
    transition: transform 0.5s ease-in-out;
    transform: ${({ step }) => `translateY(-${(step - 1) * 20}%)`};
`
const InterviewItem = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`


const VoiceService = () => {
    const [currentProgress, setCurrentProgress] = useState(1);
    const [resume, setResume] = useState(null);
    const [resumeModal, setResumeModal] = useState(false);
    const [isQuetionLoading, setIsQuestionLoading] = useState(false);
    const [questionStep, setQuestionStep] = useState(1);

    const initResume = [
        {
            rid: 0,
            title: "20250225_고라파덕_이력서",
        },
        {
            rid: 1,
            title: "20250225_뚱이_이력서",
        },
        {
            rid: 0,
            title: "20250225_시바견_이력서",
        },
        {
            rid: 1,
            title: "20250225_담곰_이력서",
        },
        {
            rid: 1,
            title: "20250225_대장_이력서",
        }
    ];
    const initQuestion = [
        {
            qid: 0,
            question: "당신은 사람입니까?" 
        },
        {
            qid: 1,
            question: "당신은 동물입니까?" 
        },
        {
            qid: 2,
            question: "당신은 외계인입니까?" 
        },
        {
            qid: 3,
            question: "당신은 식물입니까?" 
        },
        {
            qid: 4,
            question: "당신은 미생물입니까?" 
        },
    ];
    
    return (
        <VoiceServiceBox>
            {/* 이력서 title값 delete 이력서 선택 disable해야함 */}
            <Overlay onClick={() => { setResumeModal(false); }} $visible={resumeModal} />
            <ResumeModal $visible={resumeModal}>
                <span className="resume-title">{resume?.title}</span>
                <span className="real">위 이력서로 면접을 시작하시겠습니까?</span>
                <div className="btn-box">
                    <XBtn onClick={() => { setResumeModal(false); }}>취소</XBtn>
                    <OkBtn onClick={() => { setCurrentProgress(2); setResumeModal(false); }}>확인</OkBtn>
                </div>
            </ResumeModal>
            <ContentBox>
                <ProgressBox>
                    {
                        currentProgress > 1 && <ProgressLine progress={currentProgress} />
                    }
                    {[1, 2, 3, 4].map((i) => (
                        <ProgressItem key={i} active={currentProgress === i}>
                            <div className="num">{i}</div>
                            <span className="text">
                                {["이력서 선택", "질문 생성", "면접 진행", "면접 종료"][i - 1]}
                            </span>
                        </ProgressItem>
                    ))}
                </ProgressBox>
                <SliderBox>
                    <SliderWrapper progress={currentProgress}>
                        <SliderItem>
                            <ResumeBox>
                                <div className="re-outer">
                                    <div className="edge">
                                        <FaRegFilePdf className="icon" />
                                        <span className="edge-title">내 이력서 목록</span>
                                    </div>
                                    {
                                        initResume.map(item => {
                                            return (
                                                <ResumeItem key={item.rid} onClick={() => { setResume(item); setResumeModal(true); }}>
                                                    <span className="ri-title">{item.title}</span>
                                                </ResumeItem>
                                            )
                                        })
                                    }
                                </div>
                            </ResumeBox>
                        </SliderItem>
                        <SliderItem>
                            <SpinBox className="spin-box">
                                {
                                    isQuetionLoading && isQuetionLoading
                                        ?
                                        <>
                                            <Spinner />
                                            <span className="spin-title">AI가 질문을 생성중입니다</span>
                                            <span className="spin-title">잠시 숨을 고르고 면접을 준비해주세요</span>
                                        </>
                                        :
                                        <>
                                            <span className="iv-title">질문이 생성되었습니다</span>
                                            <div className="iv-btn" onClick={() => { setCurrentProgress(3); }}>면접 시작하기</div>
                                        </>
                                }
                            </SpinBox>
                        </SliderItem>
                        <SliderItem>
                            <InterviewBox>
                                <InterviewWrapper step={questionStep}>
                                    {
                                        initQuestion.map(item => {
                                            return (
                                                <InterviewItem key={item.qid}>
                                                    {item.qid+1}번 질문
                                                </InterviewItem>
                                            )
                                        })
                                    }
                                </InterviewWrapper>
                            </InterviewBox>
                        </SliderItem>
                        <SliderItem>
                            면접 종료
                        </SliderItem>
                    </SliderWrapper>
                </SliderBox>
                <div>
                    {[1, 2, 3, 4].map((i) => (
                        <button key={i} onClick={() => setCurrentProgress(i)}>
                            {i}번
                        </button>
                    ))}
                </div>
                <div>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <button key={i} onClick={() => setQuestionStep(i)}>
                            {i}번
                        </button>
                    ))}
                </div>
            </ContentBox>
        </VoiceServiceBox>
    )
};

export default VoiceService;