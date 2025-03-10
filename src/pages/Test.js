import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TestContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30px;
`

const Test = () => {
    // JS 여기에 사용하시면 됩니다
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.portone.io/v2/browser-sdk.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

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
                customer: {
                    customerId: "1"
                },
                noticeUrls: ["https://ea54-180-69-98-167.ngrok-free.app/api/webhook/billingkey"]
            });
            console.log(issueResponse);

            // 빌링키가 제대로 발급되지 않은 경우 에러 코드가 존재
            if (issueResponse.code !== undefined) {
                return alert(issueResponse.message);
            } else {
                return alert("빌링키 발급 성공")
            }


        } catch (error) {
            console.error("❌ 결제 요청 중 오류 발생:", error);
        }
    }

    async function changePayment() {
        if (!window.PortOne) {
            alert("결제 모듈이 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        try {
            // 새로운 빌링키 발급해서 수정
            const issueResponse = await window.PortOne.requestIssueBillingKey({
                storeId: "store-81df2168-b212-4d11-a72d-c6b75e28ae3f",
                channelKey: "channel-key-b7a18697-825c-4a49-b227-78b4ca252ad5",
                billingKeyMethod: "EASY_PAY",
                issueName: "유료 이용권 빌링키",
                customer: {
                    customerId: "1"
                },
                noticeUrls: ["https://ea54-180-69-98-167.ngrok-free.app/api/webhook/billingkey/modify"]
            });
            console.log(issueResponse);

            // 빌링키가 제대로 발급되지 않은 경우 에러 코드가 존재
            if (issueResponse.code !== undefined) {
                return alert(issueResponse.message);
            } else {
                return alert("결제 수단 변경 성공")
            }

        } catch (error) {
            console.error("❌ 결제 요청 중 오류 발생:", error);
        }
    }

    return (
        <>
            <button onClick={async () => {
                try {
                    const response = await fetch("https://ea54-180-69-98-167.ngrok-free.app/api/subscription", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });

                    if (!response.ok) {
                        throw new Error("구독 요청 실패");
                    }

                    const data = await response.json();
                    console.log("구독 요청 성공:", data);
                } catch (error) {
                    console.error(error);
                }
            }}>이용권 구독 요청</button>
            <button onClick={requestPayment}>결제 수단 등록</button> {/* 결제 요청 버튼 추가 */}
            <button onClick={changePayment}>결제 수단 변경</button>
        </>
    )
};

export default Test;