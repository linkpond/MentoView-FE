import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await fetch("http://localhost:8080/api/auth/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("❌ 사용자 정보 불러오기 실패");
      }
    };

    fetchUser();
  }, []);

  return user;
};

export default useUser;

