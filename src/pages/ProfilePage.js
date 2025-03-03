import React from "react";
import useUser from "../hooks/useUserInfo"

const ProfilePage = () => {
  const user = useUser();

  if (!user) {
    return <p>사용자 정보를 불러오는 중...</p>;
  }

  return (
    <div>
      <h2>프로필 정보</h2>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
      <p>ID: {user.id}</p>
    </div>
  );
};

export default ProfilePage;

