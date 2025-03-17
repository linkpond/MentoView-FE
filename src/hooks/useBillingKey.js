import { useMutation } from "@tanstack/react-query";

const issueBillingKey = async () => {
  console.log("🛠️ 빌링키 발급 요청 시작");

  if (!window.PortOne) {
    console.error("❌ 결제 모듈이 로드되지 않음");
    throw new Error("결제 모듈이 로드되지 않았습니다.");
  }

  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user || !user.userId) {
    console.error("❌ 사용자 정보 없음");
    throw new Error("사용자 정보가 없습니다.");
  }

  console.log("🔍 사용자 ID:", user.userId);

  try {
    const issueResponse = await window.PortOne.requestIssueBillingKey({
      storeId: process.env.REACT_APP_PORTONE_STORE_ID,
      channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KEY,
      billingKeyMethod: "EASY_PAY",
      issueName: "유료 이용권 빌링키",
      customer: { customerId: String(user.userId) },
      noticeUrls: [
        `${process.env.REACT_APP_API_BASE_URL}/api/webhook/billingkey`.replace(/([^:]\/)\/+/g, "$1")
      ],
    });

    console.log("✅ 빌링키 발급 응답:", issueResponse);

    if (issueResponse.code !== undefined) {
      console.error("❌ 응답 에러:", issueResponse);
      throw new Error(issueResponse.message);
    }

    return issueResponse;
  } catch (error) {
    console.error("❌ 빌링키 발급 실패:", error);
    throw error;
  }
};

const useBillingKey = (onSuccess) => {
  return useMutation({
    mutationFn: issueBillingKey,
    onMutate: () => console.log("🚀 빌링키 요청 중..."),
    onSuccess: (data) => {
      console.log("🎉 빌링키 요청 성공:", data);
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => console.error("⚠️ 빌링키 요청 에러:", error),
  });
};

export default useBillingKey;
