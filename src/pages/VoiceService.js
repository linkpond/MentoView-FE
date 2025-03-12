import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaMicrophone, FaStop } from "react-icons/fa";
import useResumeList from "../hooks/useResumeList";
import useInterviewQuestion from "../hooks/useInterviewQuestion";
import useInterviewEnd from "../hooks/useInterviewEnd";
import { setInterviewId } from "../redux/interviewSlice";
import { useDispatch } from "react-redux";
import useInterviewStatus from "../hooks/useInterviewStatus";
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
    width: ${({ progress }) => `${(progress - 1) * 79}px`};
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
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    .question-box {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: start;
        justify-content: center;
        box-shadow: 0px 2px 8px 2px rgb(0, 0, 0, 0.1);
        border-radius: 500px;
        padding: 30px;
        .edge {
            color: #777;
        }
        .question {
            
        }
    }
    .record {
        font-size: 70px;
        box-shadow: 0px 0px 4px 1px rgb(0, 0, 0, 0.1);
        padding: 10px;
        border-radius: 100%;
        border: 2px solid #eee;
        color: var(--main-color);
        cursor: pointer;
        transition: all 0.15s;
        &:hover {
            box-shadow: inset 0px 0px 8px 2px rgb(0, 0, 0, 0.1);
            filter: brightness(0.9);
        }
    }
    .button-box {
        position: relative;
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        .rec-btn {
            width: fit-content;
            height: fit-content;
            font-size: 18px;
            border: 2px solid #aaa;
            border-radius: 4px;
            padding: 6px 10px 6px 10px;
            cursor: pointer;
            margin-left: 10px;
            box-shadow: 0px 0px 4px 1px rgb(0, 0, 0, 0.1);
            transition: all 0.15s;
            &:hover {
                border: 2px solid var(--main-color);
            }
        }
        .stop {
            cursor: pointer;
            color: red;
            font-size: 30px;
            transition: all 0.15s;
            &:hover {
                opacity: 0.5;
            }
        }
        .status-box {
            position: absolute;
            top: -60px;
            width: fit-content;
            height: fit-content;;
            font-size: 18px;
        }
    }
`


const VoiceService = () => {
    const dispatch = useDispatch();
    const [currentProgress, setCurrentProgress] = useState(1);
    const [questionStep, setQuestionStep] = useState(1);
    const [audioFiles, setAudioFiles] = useState([]);
    const [resume, setResume] = useState(null);
    const [resumeId, setResumeId] = useState(null);
    const [resumeModal, setResumeModal] = useState(false);
    const [recording, setRecording] = useState(false);
    const [isRecordingComplete, setIsRecordingComplete] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const { data: resumeList } = useResumeList();
    const { data: interviewQuestions, isLoading, refetch } = useInterviewQuestion(resumeId && resumeId !== null ? resumeId : null);
    const { mutate: endInterview } = useInterviewEnd();
    useEffect(() => {
        if (resumeId) {
            refetch();
        }
    }, [resumeId]);
    const startRecording = async (questionId) => {
        if (recording) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioFiles((prevFiles) => [...prevFiles, { questionId, audioBlob }]);
            };

            mediaRecorder.start();
            setRecording(true);
        } catch (error) {
            console.error("녹음 시작 중 오류 발생:", error);
        }
    };

    const stopRecording = () => {
        if (!recording) return;

        const mediaRecorder = mediaRecorderRef.current;

        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecordingComplete(true);
        }
    };

    const handleNextQuestion = () => {
        setQuestionStep((prevStep) => prevStep + 1);
        setIsRecordingComplete(false);
    };

    const handleResumeSelect = (item) => {
        setResume(item);
        setResumeModal(true);
    };

    const handleOkClick = () => {
        setResumeId(resume?.resumeId);
        setCurrentProgress(2);
        setResumeModal(false);
    };

    const handleSubmit = () => {
        if (audioFiles.length === 0) {
            console.warn("오디오 파일이 없습니다.");
            return;
        }

        const interviewId = interviewQuestions?.[0]?.interviewId;

        if (!interviewId) {
            console.warn("interviewId가 없습니다.");
            return;
        }

        endInterview(audioFiles, {
            onSuccess: (data) => {
                setCurrentProgress(4);
                dispatch(setInterviewId(interviewId));
            },
            onError: (error) => {
                console.error("업로드 실패:", error);
                if (error.response) {
                    console.error("서버 오류 메시지:", error.response.data);
                }
            },
        });
    };
    const initQuestion = [
        { questionId: 1, question: "첫 번째 질문" },
        { questionId: 2, question: "두 번째 질문" },
        { questionId: 3, question: "두 번째 질문" },
        { questionId: 4, question: "두 번째 질문" },
        { questionId: 5, question: "두 번째 질문" },
    ];
    return (
        <VoiceServiceBox>
            <Overlay onClick={() => { setResumeModal(false); }} $visible={resumeModal} />
            <ResumeModal $visible={resumeModal}>
                <span className="resume-title">{resume?.title}</span>
                <span className="real">위 이력서로 면접을 시작하시겠습니까?</span>
                <div className="btn-box">
                    <XBtn onClick={() => { setResumeModal(false); }}>취소</XBtn>
                    <OkBtn onClick={handleOkClick}>확인</OkBtn>
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
                                        resumeList?.filter(v => v.deleteStatus !== true).length === 0 ? (
                                            <ResumeItem>
                                                <span className="ri-title">이력서를 등록 후 이용해주세요</span>
                                            </ResumeItem>
                                        ) : (
                                            resumeList
                                                ?.filter(v => v.deleteStatus !== true)
                                                .map(item => (
                                                    <ResumeItem key={item.rid} onClick={() => handleResumeSelect(item)}>
                                                        <span className="ri-title">{item.title}</span>
                                                    </ResumeItem>
                                                ))
                                        )
                                    }
                                </div>
                            </ResumeBox>
                        </SliderItem>
                        <SliderItem>
                            <SpinBox className="spin-box">
                                {
                                    isLoading && isLoading
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
                                        // interviewQuestions?.map((item, i) => {
                                        initQuestion.map((item, i) => {
                                            return (
                                                <InterviewItem key={item.questionId}>
                                                    <div className="question-box">
                                                        <span className="edge">Q{i + 1}.</span>
                                                        <span className="question">{item.question}</span>
                                                    </div>
                                                    <FaMicrophone
                                                        className="record"
                                                        onClick={isRecordingComplete ? undefined : () => startRecording(item.questionId)}
                                                        style={{ cursor: isRecordingComplete ? "default" : "pointer", opacity: isRecordingComplete ? 0.5 : 1 }}
                                                    />
                                                    <div className="button-box">
                                                        <FaStop className="stop" onClick={stopRecording} />
                                                        {isRecordingComplete && questionStep < 5 && (
                                                            <div className="rec-btn next" onClick={handleNextQuestion}>
                                                                다음 질문
                                                            </div>
                                                        )}
                                                        {isRecordingComplete && questionStep === 5 &&
                                                            <div className="rec-btn" onClick={handleSubmit}>제출하기</div>
                                                        }
                                                        <div className="status-box">
                                                            {
                                                                recording && recording &&
                                                                <span className="status">녹음중입니다. 답변 후 하단의 정지버튼을 눌러주세요</span>
                                                            }
                                                            {
                                                                !recording && !isRecordingComplete &&
                                                                <span className="status">질문을 잘 읽고 상단의 녹음버튼을 눌러주세요</span>
                                                            }
                                                            {
                                                                isRecordingComplete && questionStep < 5 &&
                                                                <span className="status">녹음이 완료되었습니다. 하단의 다음 질문 버튼을 눌러주세요</span>
                                                            }
                                                            {
                                                                isRecordingComplete && questionStep === 5 &&
                                                                <span className="status">면접이 완료되었습니다. 하단의 제출하기 버튼을 눌러주세요</span>
                                                            }
                                                        </div>
                                                    </div>
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
            </ContentBox>
        </VoiceServiceBox>
    );
};

export default VoiceService;
