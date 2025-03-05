import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleUserInfo } from "../hooks/useGoogleUserInfo.js";
import { setUser } from "../redux/authSlice.js";
import { useDispatch } from "react-redux";

const GoogleLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: googleUserInfo, refetch: fetchGoogleUserInfo } = useGoogleUserInfo();
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            sessionStorage.setItem("token", token.trim());
            fetchGoogleUserInfo();
        }
    }, [fetchGoogleUserInfo]);

    useEffect(() => {
        if (googleUserInfo) {
            dispatch(setUser(googleUserInfo));
            navigate("/");
        }
    }, [googleUserInfo, navigate, dispatch]);

    return null;
};

export default GoogleLogin;
