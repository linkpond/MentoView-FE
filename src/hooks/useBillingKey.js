import { useMutation } from "@tanstack/react-query";

const issueBillingKey = async () => {
  if (!window.PortOne) {
    throw new Error("결제 모듈이 로드되지 않았습니다.");
  }

  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user || !user.userId) {
    throw new Error("사용자 정보가 없습니다.");
  }

  const issueResponse = await window.PortOne.requestIssueBillingKey({
    storeId: process.env.REACT_APP_PORTONE_STORE_ID,
    channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KEY,
    billingKeyMethod: "EASY_PAY",
    issueName: "유료 이용권 빌링키",
    customer: { customerId: String(user.userId) },
    noticeUrls: [`${process.env.REACT_APP_API_BASE_URL}/api/webhook/billingkey`]
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
