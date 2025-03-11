import { FaCheckCircle, FaRegCreditCard } from "react-icons/fa";
import useBillingKey from "../hooks/useBillingKey";
import useCancelSubscription from "../hooks/useCancelSubscription";
import useSubscription from "../hooks/useSubscription";
import useSubscriptionStatus from "../hooks/useSubscriptionStatus";
import styled from "styled-components";

const TabContentItem = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`
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
    .plan-cancel {
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
const Subscription = () => {
    const { data: subscriptionData, refetch } = useSubscriptionStatus();
    const activeSubscription = subscriptionData?.find(sub => sub.status === "ACTIVE");
    const { mutate: cancelSubscription } = useCancelSubscription();
    const { mutate: requestSubscription } = useSubscription();
    const { mutate: issueBillingKey } = useBillingKey();
    const handlePayment = () => {
        issueBillingKey(undefined, {
            onSuccess: async (data) => {
                setTimeout(() => {
                    requestSubscription(undefined, {
                        onSuccess: (subscriptionData) => {
                            alert(JSON.stringify(subscriptionData));
                            refetch();
                        },
                        onError: (error) => {
                            alert(`구독 요청 실패: ${error.message}`);
                        },
                    });
    
                }, 1000);
            },
            onError: (error) => {
                alert(`Billing Key 요청 실패: ${error.message}`);
            },
        });
    };
    


    const handleCancelSubscription = () => {
        cancelSubscription(activeSubscription.subId, {
            onSuccess: () => {
                alert("이용권 해지가 완료되었습니다.");
            },
        });
    };

    return (
        <TabContentItem>
            <SubscriptionHeader>
                {activeSubscription ? (
                    <>
                        <span className="edge">나의 이용권</span>
                        <div className="plan-edge">{activeSubscription.plan}</div>
                        <span className="edge">다음 자동 결제일</span>
                        <div className="date">{activeSubscription.nextBillingDate}</div>
                        <div className="plan-cancel" onClick={handleCancelSubscription}>해지하기</div>
                    </>
                ) : (
                    <span className="edge">구매하신 이용권이 존재하지 않습니다.</span>
                )}
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
                        {activeSubscription ? (
                            <SubBtn className="active">이용중인 서비스</SubBtn>
                        ) : (
                            <SubBtn onClick={handlePayment}>이용권 구매</SubBtn>
                        )}
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
                            <span className="plna-text">&middot; 이력서등록 무제한</span>
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
                        {activeSubscription ? (
                            <SubBtn className="active">이용중인 서비스</SubBtn>
                        ) : (
                            <SubBtn onClick={handlePayment}>이용권 구매</SubBtn>
                        )}
                    </div>
                </div>
            </SubscriptionItemBox>
        </TabContentItem>
    );
};

export default Subscription;