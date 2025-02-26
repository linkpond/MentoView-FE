import styled from "styled-components";
import { FaAngleRight, FaRegFilePdf } from "react-icons/fa6";
import { useState } from "react";

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
            width: 10%;
            font-weight: bold;
            margin-right: 10px;
        }
        .af-text {
            width: 90%;
        }
    }
`;

const HeaderBox = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: start;
    justify-content: space-between;
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
        cursor: pointer;
        width: fit-content;
        height: fit-content;
        font-size: 24px;
        border: 2px solid #ddd;
        padding: 10px 10px 10px 15px;
        border-radius: 4px;
        transition: all 0.15s;
        &:hover {
            color: var(--main-color);
            border: 2px solid var(--main-color);
        }
    }
`


const Detail = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const init = [
        {
            question: "당신은 사람이신가요?",
            answer: "아니요 저는 짐승입니다.",
            feedback: "잘 아시네요 잘 아시네요잘 아시네요잘 아시네요잘 아시네요잘 아시네요잘 아시네요잘 아시네요잘 아시네요잘 아시네요잘 아시네요 잘 아시네요잘 아시네요잘 아시네요잘 아시네요잘 아시네요잘 아시네요잘 아시네요 잘 아시네요 ",
        },
        {
            question: "짐승처럼 소리낼수있나요?",
            answer: "ABCDEFGHIJKLMNOPQRSTUVWXZ 가나다라마바사아자차카타파하하ABCDEFGHIJKLMNOPQRSTUVWXZ 가나다라마바사아자차카타파하하ABCDEFGHIJKLMNOPQRSTUVWXZ 가나다라마바사아자차카타파하하ABCDEFGHIJKLMNOPQRSTUVWXZ 가나다라마바사아자차카타파하하ABCDEFGHIJKLMNOPQRSTUVWXZ 가나다라마바사아자차카타파하하ABCDEFGHIJKLMNOPQRSTUVWXZ 가나다라마바사아자차카타파하하ABCDEFGHIJKLMNOPQRSTUVWXZ 가나다라마바사아자차카타파하하",
            feedback: "잘 짖으시네요 훌륭합니다. 좀더 리드미컬한 부분을 추가하면 좋을 것 같아요",
        },
        {
            question: "q3",
            answer: "a3",
            feedback: "f3",
        },
        {
            question: "q4",
            answer: "a4",
            feedback: "f4",
        },
        {
            question: "q5",
            answer: "a5",
            feedback: "f5",
        },
    ];

    return (
        <DetailBox>
            <InterviewBox>
                <HeaderBox>
                    <div className="ht-box">
                        <span className="edge">No.1</span>
                        <span className="edge">응시일자</span>
                        <span className="text">20250225</span>
                        <span className="edge">Type</span>
                        <span className="text">Voice</span>
                    </div>
                    <FaRegFilePdf className="icon"/>
                </HeaderBox>
                {
                    init.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <InterviewItem key={i}>
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