import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(sessionStorage.getItem("user")),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.payload === null) {
                delete state.user;
            } else {
                state.user = action.payload;
                sessionStorage.setItem("user", JSON.stringify(action.payload));
            }
        },
        logout: (state) => {
            state.user = null;
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
