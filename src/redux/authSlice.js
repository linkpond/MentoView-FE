import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(sessionStorage.getItem("user")) || null,
    },
    reducers: {
        login: (state, action) => {
            console.log("✅ 로그인 데이터:", action.payload);  // 여기에 데이터 찍히는지 확인
            state.user = action.payload;
            sessionStorage.setItem("user", JSON.stringify(action.payload));
            console.log("🛠 저장된 데이터:", sessionStorage.getItem("user"));  // sessionStorage 저장 확인
        },
        logout: (state) => {
            state.user = null;
            sessionStorage.removeItem("user");
            console.log("🚪 로그아웃됨, sessionStorage에서 제거됨");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
