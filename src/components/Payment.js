import styled from "styled-components";
import useSubscriptionStatus from "../hooks/useSubscriptionStatus";
import { FaAngleRight } from "react-icons/fa6";
import { useState } from "react";

const TabContentItem = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .empty {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 20px;
    }
    @media (max-width: 400px) {
        .empty {
            font-size: 16px;
        }
    }
`

const PaymentItem = styled.div`
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border: 1.5px solid #aaa;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    .sub-box {
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        .edge {
            font-weight: bold;
            margin-right: 5px;
        }
        .plan-edge {
            font-size: 10px;
            font-weight: bold;
            color: #fff;
            background-color: var(--main-color);
            padding: 5px 10px;
            border-radius: 4px;
            margin-right: 5px;
        }
        .sub-text {
            font-weight: bold;
            color: #888;
            margin-right: 10px;
        }
        .kakao {
            width: 55px;
            margin-right: 10px;
        }
    }
    @media (max-width: 500px) {
        .hide {
            display: none;
        }
    }
`
const ToggleIcon = styled(FaAngleRight)`
    color: var(--main-color);
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.15s;
    transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
    margin-left: auto;
`;

const AccordionContent = styled.div`
    padding: ${({ isOpen }) => (isOpen ? "0px 10px 10px 10px;" : "none")};
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    max-height: ${({ isOpen }) => (isOpen ? "300px;" : "0")};
    border-bottom: ${({ isOpen }) => (isOpen ? "1.5px solid #ddd" : "none")};
    margin: ${({ isOpen }) => (isOpen ? "15px 0px 0px 0px" : "none")};
    transition: all 0.15s;
    font-weight: bold;
    .edge {
        margin-right: 10px;
    }
    .edge-color {
        color: var(--main-color);

        margin-right: 10px;
    }
    .pay-text {
        margin-right: 10px;
        color: #888;
    }
    .right, .left {
        width: fit-content;
        height: fit-content;
        display: flex;
        align-items: center;
    }
    @media (max-width: 550px) {
        flex-direction: column;
        align-items: start;
        .left > .pay-text {
            margin: 0;
        }
        .right {
            margin-top: 10px;
        }
    }
`;

const Payment = () => {
    const { data: subscriptionData } = useSubscriptionStatus();
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const formatAmount = (amount) => {
        return amount.toLocaleString("ko-KR", { style: "currency", currency: "KRW" });
    };

    return (
        <TabContentItem>
            {subscriptionData && subscriptionData.length > 0 ? (
                subscriptionData
                    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                    .map((item, i) => {
                        const isOpen = openIndex === item.subId;
                        return (
                            <PaymentItem key={item.subId}>
                                <div className="sub-box">
                                    <span className="edge">결제수단</span>
                                    <img className="kakao" src={process.env.PUBLIC_URL + "kakao.webp"} alt="kakaopay" />
                                    <span className="edge">등록일자</span>
                                    <span className="sub-text">{item.startDate}</span>
                                    <span className="edge hide">이용권</span>
                                    <span className="plan-edge hide">{item.plan}</span>
                                    <ToggleIcon isOpen={isOpen} onClick={() => toggleAccordion(item.subId)} />
                                </div>
                                {item.payments
                                    .filter(v => v.subId === item.subId)
                                    .sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate))
                                    .map((payment, j) => (
                                        <AccordionContent key={payment.paymentId} isOpen={isOpen}>
                                            <div className="left">
                                                <span className="edge-color">{j + 1}회차</span>
                                                <span className="edge">결제일자</span>
                                                <span className="pay-text">{new Date(payment.paymentDate).toLocaleString("ko-KR")}</span>
                                            </div>
                                            <div className="right">
                                                <span className="edge">결제금액</span>
                                                <span className="pay-text">{formatAmount(payment.amount)}</span>
                                            </div>
                                        </AccordionContent>
                                    ))}
                            </PaymentItem>
                        );
                    })
            ) : (
                <div className="empty">이용권 결제내역이 존재하지 않습니다</div>
            )}
        </TabContentItem>
    );
};

export default Payment;