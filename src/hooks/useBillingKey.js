import { useMutation } from "@tanstack/react-query";

const issueBillingKey = async () => {
  if (!window.PortOne) {
    throw new Error("결제 모듈이 로드되지 않았습니다.");
  }

  const issueResponse = await window.PortOne.requestIssueBillingKey({
    storeId: process.env.REACT_APP_PORTONE_STORE_ID,
    channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KEY,
    billingKeyMethod: "EASY_PAY",
    issueName: "유료 이용권 빌링키",
    customer: { customerId: "1" },
    noticeUrls: ["https://da14-58-123-254-149.ngrok-free.app/api/webhook/billingkey"]
  });

  if (issueResponse.code !== undefined) {
    throw new Error(issueResponse.message);
  }

  return issueResponse;
};

const useBillingKey = (onSuccess) => {
    return useMutation({
      mutationFn: issueBillingKey,
      onSuccess,
    });
  };

export default useBillingKey;
