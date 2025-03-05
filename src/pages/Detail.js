import styled from "styled-components";
import { FaAngleRight, FaRegFilePdf } from "react-icons/fa6";
import { useRef, useState } from "react";
import useInterviewDetail from "../hooks/useInterviewDetail";
import { useLocation, useParams } from "react-router-dom";


const DetailBox = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 200px 50px 200px;
    background-color: #eee;
`
const InterviewBox = styled.div`
    width: fit-content;
    min-width: 1000px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 0px 8px 1px rgb(0, 0, 0, 0.1);
`
const InterviewItem = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border: 2px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin: 10px 0px 10px 0px;
    padding-bottom: 10px;
    transition: all 0.15s;
    &:hover {
        border: 2px solid var(--main-color);
    }
    .ii-inner {
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: start;
        justify-content: start;
        .edge {
            font-weight: bold;
            margin-right: 10px;
        }
    }
`
const ToggleIcon = styled(FaAngleRight)`
    color: var(--main-color);
    font-size: 16px;
    margin-left: auto;
    cursor: pointer;
    transition: transform 0.15s;
    transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
`;

const AccordionContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    max-height: ${({ isOpen }) => (isOpen ? "500px;" : "0")};
    transition: all 0.15s;
    .af-box {
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: start;
        padding: 10px 0px 10px 20px;
        margin-top: 10px;
        border-top: 1.5px solid #ddd;
        .edge {
            width: 12%;
            font-weight: bold;
            margin-right: 10px;
            /* border: 1px solid red; */
        }
        .af-text {
            width: 88%;
        }
    }
`;

const HeaderBox = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: start;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
    .ht-box {
        font-size: 13px;
        .edge {
            font-weight: bold;
            margin-right: 5px;
        }
        .text {
            margin-right: 5px;
        }
    }
    .icon {
        margin-left: auto;
        cursor: pointer;
        width: fit-content;
        height: fit-content;
        font-size: 26px;
        transition: all 0.15s;
        &:hover {
            color: var(--main-color);
        }
    }
    .delete-btn {
        margin-left: 10px;
        background-color: #aaa;
        color: #fff;
        width: fit-content;
        height: fit-content;
        font-size: 13px;
        padding: 6px 10px 6px 10px;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.15s;
        &:hover {
            background-color: #f05650;
        }
    }
`


const Detail = () => {
    const { interviewId } = useParams();
    const location = useLocation();
    const interviewData = location.state;
    const { data: init, isLoading, error } = useInterviewDetail(interviewId);
    const [openIndex, setOpenIndex] = useState(null);
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (isLoading) return console.log("ld");
    if (error) return console.log(error);

    return (
        <DetailBox>
            <InterviewBox>
                <HeaderBox>
                    <div className="ht-box">
                        <span className="edge">응시일자</span>
                        <span className="text">{interviewData.createdat}</span>
                        <span className="edge">Type</span>
                        <span className="text">{interviewData.type}</span>
                    </div>
                    <FaRegFilePdf className="icon" />
                    <div className="delete-btn">Delete</div>
                </HeaderBox>
                {
                    init?.map((item, i) => {
                        const isOpen = openIndex === i || openIndex === -1;
                        return (
                            <InterviewItem key={item.questionId}>
                                <div className="ii-inner">
                                    <span className="edge">Q{i + 1}</span>
                                    <span className="ii-title">{item.question}</span>
                                    <ToggleIcon isOpen={isOpen} onClick={() => toggleAccordion(i)} />
                                </div>
                                <AccordionContent isOpen={isOpen}>
                                    <div className="af-box">
                                        <span className="edge">&middot; Your Answer</span>
                                        <span className="af-text">{item.answer}</span>
                                    </div>
                                    <div className="af-box">
                                        <span className="edge">&middot; Feedback</span>
                                        <span className="af-text">{item.feedback}</span>
                                    </div>
                                </AccordionContent>
                            </InterviewItem>
                        )
                    })
                }
            </InterviewBox>
        </DetailBox>
    )
};

export default Detail;