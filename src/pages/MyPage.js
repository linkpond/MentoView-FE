import styled from "styled-components";
import { RiLogoutBoxLine } from "react-icons/ri";
import React, { useState } from "react";
import { FaRegCreditCard, FaCheckCircle } from "react-icons/fa";

// Mypage
const MyPageBox = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #eee;
    padding: 0px 200px 0px 200px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const MyPageTabBox = styled.div`
    width: 1000px;
    height: 550px;
    background-color: #fff;
    display: flex;
    border-radius: 8px;
    box-shadow: 0px 2px 10px 1px rgb(0, 0, 0, 0.1);
    overflow: hidden;
`
const MyPageTab = styled.div`
    position: relative;
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1.5px solid #ddd;
    .logout {
        position: absolute;
        bottom: 10px;
        right: 10px;
        cursor: pointer;
        color: var(--main-color);
        font-size: 30px;
        transition: all 0.15s;
        &:hover {
            opacity: 0.7;
        }
    }
    .logo {
        width: 100px;
        position: absolute;
        bottom: 10px;
        left: 15px;
    }
`
const TabItem = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 15px;
    font-size: 14px;
    font-weight: bold;
    border: 2px solid transparent;
    cursor: pointer;
    background-color: ${({ active }) => (active ? "var(--main-color)" : "transparent")};
    color: ${({ active }) => (active ? "#fff" : "inhelit")};
    &:hover {
        border: 2px solid var(--main-color);
    }
`

// TabContent
const TabContentBox = styled.div`
    width: 750px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const TabContentItem = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
`

// TabContent - Subscription
const SubscriptionHeader = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: start;
    margin-bottom: 30px;
    font-weight: bold;
    border-bottom: 1.5px solid #ddd;
    padding-bottom: 10px;
    .edge {
        margin-right: 5px;
        color: #555;
    }
    .plan-edge {
        font-size: 10px;
        font-weight: bold;
        color: #fff;
        background-color: var(--main-color);
        padding: 5px 10px;
        border-radius: 4px;
        margin-right: auto;
    }
    .plan-cancle {
        font-size: 10px;
        font-weight: bold;
        color: #fff;
        background-color: #f05650;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 4px;
        transition: all 0.15s;
        &:hover {
            opacity: 0.7;
        }
    }
    .date {
        color: #777;
        margin-right: 5px;
    }

`
const SubBtn = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-color);
    color: #fff;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    margin-top: auto;
    transition: all 0.15s;
    &:hover {
        opacity: 0.7;
    }
    &.active {
        background-color: #fff;
        color: var(--main-color) !important;
        border: 2px solid var(--main-color);
        &:hover {
            opacity: initial;
            cursor: initial;
        }
    }
`
const SubscriptionItemBox = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 40px;
    .item {
        width: 280px;
        height: 430px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 4px 12px 0.1px rgb(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
        .item-header {
            width: 100%;
            height: fit-content;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: var(--main-color);
            color: #fff;
            font-weight: bold;
            padding: 10px 0px;
            .it-text {
                margin-bottom: 10px;
            }
            .it-icon {
                width: fit-content;
                height: fit-content;
                display: flex;
                align-items: center;
                justify-content: center;
                .price {
                    font-size: 16px;
                }
                .card {
                    font-size: 20px;
                    margin-right: 5px;
                }
            }
        }
        .plan-outer{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
        }
        .plan-title {
            width: fit-content;
            height: fit-content;
            padding: 10px 20px 20px 20px;
            text-align: center;
            font-weight: bold;
        }
        .plan-edge {
            font-weight: bold;
            margin-bottom: 10px;
            margin-right: auto;
        }
        .plan-text-box {
            width: 100%;
            height: fit-content;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 10px;
            margin-bottom: 20px;
            border-bottom: 1.5px solid #ddd;
            font-weight: bold;
            color: #aaa;
            .check {
                color: var(--main-color);
            }
        }
    }
`

// TabContent - Payment 


const Subscription = () => {

    async function requestPayment() {
        if (!window.PortOne) {
            alert("결제 모듈이 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
            return;
        }
    
        try {
            // 빌링키 발급
            const issueResponse = await window.PortOne.requestIssueBillingKey({
                storeId: "store-81df2168-b212-4d11-a72d-c6b75e28ae3f",
                channelKey: "channel-key-b7a18697-825c-4a49-b227-78b4ca252ad5",
                billingKeyMethod: "EASY_PAY",
                issueName: "유료 이용권 빌링키",
                customer: { customerId: "1" },
                noticeUrls: ["https://ea54-180-69-98-167.ngrok-free.app/api/webhook/billingkey"]
            });
    
            console.log(issueResponse);
    
            if (issueResponse.code !== undefined) {
                return alert(issueResponse.message);
            } else {
                alert("✅ 빌링키 발급 성공!");
    
                // ✅ 빌링키 발급 성공 시 구독 요청 실행
                await requestSubscription();
            }
    
        } catch (error) {
            console.error("❌ 결제 요청 중 오류 발생:", error);
        }
    }
    
    // ✅ 구독 요청 함수
    async function requestSubscription() {
        try {
            const response = await fetch("https://9f07-58-123-254-149.ngrok-free.app/api/subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                mode: "cors"
            });
    
            if (!response.ok) {
                throw new Error("구독 요청 실패");
            }
    
            const data = await response.json();
            console.log("✅ 구독 요청 성공:", data);
        } catch (error) {
            console.error("❌ 구독 요청 중 오류 발생:", error);
        }
    }
    

    return (
        <TabContentItem>
            <SubscriptionHeader>
                <span className="edge">홍길동 님의 이용권</span>
                <div className="plan-edge">PREMIUM</div>
                <span className="edge">다음 자동 결제일</span>
                <div className="date">2025-03-06</div>
                <div className="plan-cancle">해지하기</div>
            </SubscriptionHeader>
            <SubscriptionItemBox>
                <div className="item">
                    <div className="item-header">
                        <span className="it-text">BASIC</span>
                        <div className="it-icon">
                            <FaRegCreditCard className="card" />
                            <span className="price">월 &#8361;10,000</span>
                        </div>
                    </div>
                    <div className="plan-outer">
                        <div className="plan-title">합리적인 가격으로 서비스를 이용하고 싶으신 분들에게 추천합니다</div>
                        <span className="plan-edge">이력서 등록</span>
                        <div className="plan-text-box">
                            <span className="plna-text">&middot; 이력서등록 5건</span>
                            <FaCheckCircle className="check" />
                        </div>
                        <span className="plan-edge">AI 음성면접</span>
                        <div className="plan-text-box">
                            <span className="plna-text">&middot; 면접 응시 무제한</span>
                            <FaCheckCircle className="check" />
                        </div>
                        <SubBtn onClick={requestPayment}>이용권 구매</SubBtn>
                    </div>
                </div>
                <div className="item">
                    <div className="item-header">
                        <span className="it-text">PREMIUM</span>
                        <div className="it-icon">
                            <FaRegCreditCard className="card" />
                            <span className="price">월 &#8361;20,000</span>
                        </div>
                    </div>
                    <div className="plan-outer">
                        <div className="plan-title">실제 면접같은 영상면접 서비스를 이용해 보실 수 있습니다</div>
                        <span className="plan-edge">이력서 등록</span>
                        <div className="plan-text-box">
                            <span className="plna-text">&middot; 이력서등록 5건</span>
                            <FaCheckCircle className="check" />
                        </div>
                        <span className="plan-edge">AI 음성면접</span>
                        <div className="plan-text-box">
                            <span className="plna-text">&middot; 면접 응시 무제한</span>
                            <FaCheckCircle className="check" />
                        </div>
                        <span className="plan-edge">AI 영상면접</span>
                        <div className="plan-text-box">
                            <span className="plna-text">&middot; 면접 응시 무제한</span>
                            <FaCheckCircle className="check" />
                        </div>
                        <SubBtn className="active">이용중인 서비스</SubBtn>
                    </div>

                </div>
            </SubscriptionItemBox>
        </TabContentItem>
    );
};
const Payment = () => {
    return (
        <TabContentItem>
            <div className=""></div>
        </TabContentItem>
    );
};
const ChangePassword = () => {
    return (
        <TabContentItem>
            비밀번호 변경 화면
        </TabContentItem>
    );
};

const DeleteAccount = () => {
    return (
        <TabContentItem>
            회원 탈퇴 화면
        </TabContentItem>
    );
};

const tabContents = {
    "구독 관리": () => { return <Subscription />; },
    "결재 내역": () => { return <Payment />; },
    "비밀번호 변경": () => { return <ChangePassword />; },
    "회원 탈퇴": () => { return <DeleteAccount />; },
};

const MyPage = () => {
    const [activeTab, setActiveTab] = useState("구독 관리");

    const initData = [
        {
            "subId": 1,
            "status": "EXPIRY",
            "plan": "PREMIUM",
            "startDate": "2025-03-06",
            "endDate": "2025-03-06",
            "nextBillingDate": "2025-03-06",
            "paymentMethod": "KAKAO_PAY",
            "userId": 2,
            "payments": [
                {
                    "paymentId": 1,
                    "amount": 10000.00,
                    "approvalCode": "01956924-5190-cdc1-efba-4799d5827ed6",
                    "status": "SUCCESS",
                    "paymentDate": "2025-03-06T10:49:02.933428",
                    "subId": 1
                }
            ]
        },
        {
            "subId": 2,
            "status": "ACTIVE",
            "plan": "PREMIUM",
            "startDate": "2025-03-06",
            "endDate": "2025-04-05",
            "nextBillingDate": "2025-04-06",
            "paymentMethod": "KAKAO_PAY",
            "userId": 2,
            "payments": [
                {
                    "paymentId": 2,
                    "amount": 10000.00,
                    "approvalCode": "01956925-cff8-cf05-d95e-c4dfba4eb65c",
                    "status": "SUCCESS",
                    "paymentDate": "2025-03-06T10:50:40.769979",
                    "subId": 2
                },
                {
                    "paymentId": 3,
                    "amount": 10000.00,
                    "approvalCode": "01956927-f3f6-1a52-5e88-de508f91319e",
                    "status": "SUCCESS",
                    "paymentDate": "2025-03-06T10:53:01.119346",
                    "subId": 2
                },
                {
                    "paymentId": 4,
                    "amount": 10000.00,
                    "approvalCode": "0195692a-b2f4-ad76-d362-ab62f56fd649",
                    "status": "SUCCESS",
                    "paymentDate": "2025-03-06T10:56:01.0839",
                    "subId": 2
                },
                {
                    "paymentId": 5,
                    "amount": 10000.00,
                    "approvalCode": "0195692d-7325-3643-d8b1-8fbccdf5da39",
                    "status": "SUCCESS",
                    "paymentDate": "2025-03-06T10:59:01.341023",
                    "subId": 2
                }
            ]
        }
    ];

    return (
        <MyPageBox>
            <MyPageTabBox>
                <MyPageTab>
                    {Object.keys(tabContents).map((tab) => (
                        <TabItem
                            key={tab}
                            active={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </TabItem>
                    ))}
                    <RiLogoutBoxLine className="logout" />
                    <img className="logo" src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" />
                </MyPageTab>
                <TabContentBox>
                    {tabContents[activeTab] && tabContents[activeTab]()}
                </TabContentBox>
            </MyPageTabBox>
        </MyPageBox>
    );
};

export default MyPage;