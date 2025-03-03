const fetchGoogleAuthUrl = async () => {
  const response = await fetch("http://localhost:8080/api/authorization/google");
  const data = await response.json();
  window.location.href = data.authUrl; // Google 로그인 페이지로 이동
};

export default fetchGoogleAuthUrl;

