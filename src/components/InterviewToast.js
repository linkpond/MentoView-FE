import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import useInterviewStatus from '../hooks/useInterviewStatus';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { setInterviewId } from '../redux/interviewSlice';
import { useEffect, useState } from 'react';

const ToastBox = styled.div`
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 255, 255, 0.7);
    border-radius: 4px;
    padding: 15px 20px;
    box-shadow: 0px 0px 4px 1px rgb(0, 0, 0, 0.1);
    .toast-text {
        font-weight: bold;
        margin-right: 15px;
    }
    .toast-btn {
        padding: 6px 12px;
        background-color: #aaa;
        color: #fff;
        font-weight: bold;
        border-radius: 4px;
        transition: all 0.15s;
        cursor: pointer;
        &:hover {
            background-color: var(--main-color);
        }
    }
    @media (max-width: 600px) {
        left: 10px;
        bottom: 10px;
    }
`;

const Spinner = styled.div`
    width: 25px;
    height: 25px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid var(--main-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    padding: 10px;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const InterviewToast = () => {
    const dispatch = useDispatch();
    const interviewId = useSelector((state) => state.interview.interviewId);
    const { data: interviewStatus, isLoading } = useInterviewStatus(interviewId);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 600);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!interviewId || isLoading) return null;

    const handleNavigate = () => {
        navigate("/myservice");
        queryClient.removeQueries(['interviewStatus', interviewId]);
        dispatch(setInterviewId(null));
    };



    return (
        <ToastBox>
            {interviewStatus === "COMPLETED" ? (
                <>
                    <span className='toast-text'>
                        {isMobile ? "생성 완료" : "피드백 생성이 완료되었습니다."}
                    </span>
                    <div className='toast-btn' onClick={handleNavigate}>
                        결과 확인
                    </div>
                </>
            ) : (
                <>
                    <span className='toast-text'>
                        {isMobile ? "피드백 생성중" : "피드백이 생성중입니다. 잠시만 기다려주세요 :)"}
                    </span>
                    <Spinner />
                </>
            )}
        </ToastBox>
    );
};

export default InterviewToast;
