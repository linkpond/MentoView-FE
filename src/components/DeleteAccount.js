import styled from "styled-components";
import { FaRegCheckCircle, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import useDeleteAccount from "../hooks/useDeleteAccount";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const TabContentItem = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    .title {
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 40px;
    }
    .info-box {
        padding: 20px;
        border-top: 2px solid var(--main-color);
        width: 500px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        .info-text-edge {
            color: var(--main-color);
            font-weight: bold;
            margin: 20px 0px 10px 0px;
        }
        .step-text {
            margin-top: 10px;
        }
        line-height: 150%;
    }
    .check-box {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        .check {
            cursor: pointer;
            font-size: 20px;
            margin-right: 10px;
            color: var(--main-color);
            &.none {
                color: #ddd;
            }
        }
    }
    .submit-btn {
        margin-top: 30px;
        width: 500px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border: 2px solid #f05650;
        font-weight: bold;
        color: #f05650;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.15s;
        &:hover {
            background-color: #f05650;
            color: #fff;
        }
    }
    @media (max-width: 600px) {
        .info-box, .submit-btn {
            width: 100%;
        }
    }
`

const DeleteAccount = () => {
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();
    const deleteAccountMutation = useDeleteAccount();
    const dispatch = useDispatch();
    const handleDeleteAccount = () => {
        if (!agree) return;

        deleteAccountMutation.mutate(null, {
            onSuccess: () => {
                alert("회원 탈퇴가 완료되었습니다.");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("isAuthenticated");
                dispatch(setUser(null));
                navigate("/");
            },
            onError: (error) => {
                console.error("회원 탈퇴 실패:", error);
            }
        });
    };

    return (
        <TabContentItem>
            <span className="title">회원탈퇴안내</span>
            <div className="info-box">
                <span className="info-text">
                    고객님께서 회원 탈퇴를 원하신다니 저희 서비스가 많이 부족하고 미흡했나 봅니다.
                    불편하셨던 점이나 불만사항을 고객센터에 알려주시면 적극 반영하겠습니다.
                </span>
                <span className="info-text-edge">아울러 회원 탈퇴 시 아래 사항을 숙지하시기 바랍니다.</span>
                <span className="step-text">1. 회원 탈퇴 시 고객님의 정보는 전자상거래법에 따라 관리됩니다.</span>
                <span className="step-text">2. 회원 탈퇴 시 이용 중이던 이용권은 중단됩니다.</span>
            </div>
            <div className="check-box" onClick={() => setAgree(!agree)}>
                {agree ? (
                    <>
                        <FaCheckCircle className="check" />
                        <span className="check-title">회원 탈퇴에 대한 동의가 완료되었습니다.</span>
                    </>
                ) : (
                    <>
                        <FaRegCheckCircle className="check none" />
                        <span className="check-title">회원 탈퇴에 동의하겠습니다.</span>
                    </>
                )}
            </div>
            <div className="submit-btn" onClick={handleDeleteAccount} style={{ cursor: agree ? "pointer" : "not-allowed", opacity: agree ? 1 : 0.5 }}>
                회원탈퇴
            </div>
        </TabContentItem>
    );
};

export default DeleteAccount;