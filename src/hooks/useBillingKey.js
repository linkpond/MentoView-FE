import { useMutation } from "@tanstack/react-query";

const issueBillingKey = async () => {
  if (!window.PortOne) {
    throw new Error("결제 모듈이 로드되지 않았습니다.");
  }

  const issueResponse = await window.PortOne.requestIssueBillingKey({
    storeId: "store-81df2168-b212-4d11-a72d-c6b75e28ae3f",
    channelKey: "channel-key-b7a18697-825c-4a49-b227-78b4ca252ad5",
    billingKeyMethod: "EASY_PAY",
    issueName: "유료 이용권 빌링키",
    customer: { customerId: "1" },
    noticeUrls: ["https://mentoview.site/api/webhook/billingkey"]
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
