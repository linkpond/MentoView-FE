import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyServiceBox = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    padding: 0px 200px 0px 200px;
`
const CreateBtn = styled.div`
    position: absolute;
    right: 0;
    top: -50px;
    width: fit-content;
    height: fit-content;
    background-color: var(--main-color);
    color: #fff;
    padding: 10px 20px 10px 20px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 16px;
    margin: 0px 0px 10px auto;
    cursor: pointer;
    box-shadow: 0px 0px 4px 1px rgb(0, 0, 0, 0.1);
    &:hover {
        opacity: 0.8;
    }
`

const ResumeBox = styled.div`
    padding: 20px;
    position: relative;
    width: 1000px;
    height: fit-content;
    min-height: 500px;
    background-color: #fff;
    border: 2px solid var(--main-color);
    border-radius: 8px;
    box-shadow: 0px 2px 10px 1px rgb(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`
const ResumeItem = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border: 1.5px solid #aaa;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    .ri-inner {
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: start;
        .edge {
            font-weight: bold;
            margin-right: 10px;
        }
        .ri-title {
            margin-right: 20px;
            font-size: 14px;
        }
        .ri-button {
            background-color: #aaa;
            color: #fff;
            margin-left: auto;
            width: fit-content;
            height: fit-content;
            padding: 5px;
            font-size: 10px;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.15s;
            &:hover {
                background-color: red;
            }
        }
    }
`
const ToggleIcon = styled(FaAngleRight)`
    color: var(--main-color);
    font-size: 16px;
    margin-left: 20px;
    cursor: pointer;
    transition: transform 0.15s;
    transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
`;

const AccordionContent = styled.div`
    padding: ${({ isOpen }) => (isOpen ? "0px 10px 10px 10px;" : "none")};
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    max-height: ${({ isOpen }) => (isOpen ? "120px;" : "0")};
    border-bottom: ${({ isOpen }) => (isOpen ? "1.5px solid #ddd" : "none")};
    margin: ${({ isOpen }) => (isOpen ? "15px 0px 0px 0px" : "none")};
    transition: all 0.15s;
    .edge {
        font-weight: bold;
    }
    .ac-text {
        margin: 0px 10px 0px 10px;
    }
    .detail-btn {
        margin-left: auto;
        background-color: #aaa;
        color: #fff;
        margin-left: auto;
        width: fit-content;
        height: fit-content;
        padding: 5px;
        font-size: 10px;
        font-weight: bold;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.15s;
        &:hover {
            background-color: var(--main-color);
        }
    }
`;

const MyService = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const init = [
        {
            rid: 0,
            title: "20250225_고라파덕_이력서",
            uid: [
                { iid: "0", rid: 0, type: "voice", status: "done", createdat: "20250225" },
                { iid: "1", rid: 0, type: "video", status: "done", createdat: "20250226" }
            ]
        },
        {
            rid: 1,
            title: "20250225_뚱이_이력서",
            uid: [
                { iid: "2", rid: 1, type: "voice", status: "done", createdat: "20250227" },
                { iid: "3", rid: 1, type: "video", status: "진행중이에요옹", createdat: "20250228" }
            ]
        }
    ];

    return (
        <MyServiceBox>
            <ResumeBox>
                <CreateBtn>이력서 등록</CreateBtn>
                {

                    init.map((item, i) => {
                        const isOpen = openIndex === item.rid;
                        return (
                            <ResumeItem key={item.rid}>
                                <div className="ri-inner">
                                    <span className="edge">{i + 1}번 이력서</span>
                                    <span className="ri-title">{item.title}</span>
                                    <div className="ri-button">DELETE</div>
                                    <ToggleIcon isOpen={isOpen} onClick={() => toggleAccordion(item.rid)} />
                                </div>
                                {
                                    item.uid.filter(item2 => item2.rid === item.rid).map((item2, j) => {
                                        return (
                                            <AccordionContent key={item2.iid} isOpen={isOpen}>
                                                <span className="edge">&middot; 응시일자</span>
                                                <span className="ac-text">{item2.createdat}</span>
                                                <span className="edge">타입</span>
                                                <span className="ac-text">{item2.type}</span>
                                                <span className="edge">상태</span>
                                                <span className="ac-text">{item2.status}</span>
                                                <div className="detail-btn" onClick={() => { navigate("/myservice/" + item2.iid)}}>상세 보기</div>
                                            </AccordionContent>
                                        )
                                    })
                                }
                            </ResumeItem>
                        )
                    })
                }
            </ResumeBox>
        </MyServiceBox>
    );
};

export default MyService;