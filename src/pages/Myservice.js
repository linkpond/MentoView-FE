import styled from "styled-components";
import { FaAngleRight } from "react-icons/fa6";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileUpload } from "react-icons/fa";
import useUploadResume from "../hooks/useUploadResume";
import useResumeList from "../hooks/useResumeList";
import useDeleteResume from "../hooks/useDeleteResume";

const MyServiceBox = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #eee;
    padding: 20px 200px 20px 200px;
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
    border-radius: 8px;
    box-shadow: 0px 2px 10px 1px rgb(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    .empty {
        margin: auto;
        font-size: 24px;
        font-weight: bold;
    }
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
                background-color: #f05650;
            }
        }
        .disabled {
            background-color: #f05650 !important;
            cursor: inherit !important;
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
    .disabled {
        background-color: #f05650 !important;
        cursor: inherit !important;
    }
`;

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
    .icon-box {
        cursor: pointer;
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #eee;
        border-radius: 4px;
        padding: 5px;
        transition: all 0.15s;
        .upload-icon {
            color: var(--main-color);
            font-size: 24px;
        }
        .icon-title {
            font-weight: bold;
            margin-left: 5px;
            font-size: 20px;
        }
        &:hover {
            border: 2px solid var(--main-color);
        }
    }
    .resume-file {
        display: none;
    }
    .file-name {
        margin-top: 15px;
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

const MyService = () => {
    const { data: resumeList, refetch, isLoading } = useResumeList();
    const { mutate: uploadResume } = useUploadResume();
    const { mutate: deleteResume } = useDeleteResume();
    const [openIndex, setOpenIndex] = useState(null);
    const [fileName, setFileName] = useState('');
    const [createModal, setCreateModal] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const filteredResumeList = resumeList?.filter(item => item.deleteStatus !== true);

    if (isLoading) {
        return (
            <MyServiceBox>
                <Spinner />
            </MyServiceBox>
        );
    }

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (fileExtension === 'pdf') {
                setFileName(file.name);
            } else {
                alert('PDF 파일만 업로드할 수 있습니다.');
                setFileName('');
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSubmit = () => {
        if (!fileName) {
            alert('파일을 선택해주세요.');
            return;
        }

        const formData = new FormData();
        const file = fileInputRef.current.files[0];
        if (file) {
            formData.append('file', file);
        }

        uploadResume(formData, {
            onSuccess: () => {
                navigate('/myservice');
                refetch();
                setCreateModal(false);
            },
            onError: (error) => {
                console.error("파일 업로드 실패:", error);
            },
        });
    };

    const handleDeleteClick = (resumeId) => {
        deleteResume(resumeId, {
            onSuccess: () => {
                refetch();
            },
            onError: (error) => {
                console.error("삭제 실패:", error);
            },
        });
    };

    return (
        <MyServiceBox>
            <Overlay onClick={() => { setCreateModal(false); }} $visible={createModal} />
            <ResumeModal $visible={createModal}>
                <div className="icon-box" onClick={handleUploadClick}>
                    <FaFileUpload className="upload-icon" />
                    <span className="icon-title">파일선택</span>
                </div>
                <input
                    className="resume-file"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                {
                    fileName ?
                        <>
                            <span className="file-name">{fileName}</span>
                            <span className="real">위 이력서를 업로드하시겠습니까?</span>
                        </>
                        : <span className="real">PDF 파일만 업로드할 수 있습니다</span>
                }
                <div className="btn-box">
                    <XBtn onClick={() => { setCreateModal(false); }}>취소</XBtn>
                    <OkBtn onClick={handleSubmit}>확인</OkBtn>
                </div>
            </ResumeModal>
            <ResumeBox>
                <CreateBtn onClick={() => {
                    if (filteredResumeList.length >= 5) {
                        alert('최대 5개의 이력서만 등록 가능합니다');
                    } else {
                        setCreateModal(true);
                    }
                }}>이력서 등록</CreateBtn>
                {
                    filteredResumeList && filteredResumeList.length > 0 ? (
                        resumeList.map((item, i) => {
                            const isOpen = openIndex === item.resumeId;
                            return (
                                <ResumeItem key={item.resumeId}>
                                    <div className="ri-inner">
                                        <span className="edge">{i + 1}번 이력서</span>
                                        <span className="ri-title">{item.title}</span>
                                        {
                                            item.deleteStatus ? (
                                                <div className="ri-button disabled">삭제 완료</div>
                                            ) : (
                                                <div className="ri-button" onClick={() => handleDeleteClick(item.resumeId)}>DELETE</div>
                                            )
                                        }
                                        <ToggleIcon isOpen={isOpen} onClick={() => toggleAccordion(item.resumeId)} />
                                    </div>
                                    {
                                        item.interviewList.filter(item2 => item2.resumeId === item.resumeId).map((item2, j) => {
                                            return (
                                                <AccordionContent key={item2.interviewId} isOpen={isOpen}>
                                                    <span className="edge">{j + 1}&nbsp;&middot;&nbsp;</span>
                                                    <span className="edge">응시일자</span>
                                                    <span className="ac-text">{item2.created_at}</span>
                                                    <span className="edge">타입</span>
                                                    <span className="ac-text">{item2.interviewType}</span>
                                                    <span className="edge">상태</span>
                                                    <span className="ac-text">{item2.interviewStatus}</span>
                                                    {
                                                        item2.interviewStatus === 'COMPLETED' ? (
                                                            <div className="detail-btn" onClick={() => {
                                                                navigate("/myservice/" + item2.interviewId, { state: item2 });
                                                                window.scrollTo(0, 0);
                                                            }}>
                                                                상세 보기
                                                            </div>
                                                        ) : (
                                                            <div className="detail-btn disabled">
                                                                결과 생성중
                                                            </div>
                                                        )
                                                    }
                                                </AccordionContent>
                                            )
                                        })
                                    }
                                </ResumeItem>
                            )
                        })
                    ) : (
                        <span className="empty">이력서를 등록해주세요 :)</span>
                    )
                }
            </ResumeBox>
        </MyServiceBox>
    );
};

export default MyService;