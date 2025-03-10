import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormUserInfo } from "../hooks/useFormUserInfo.js";
import { setUser } from "../redux/authSlice.js";
import { useDispatch } from "react-redux";

const FormLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: formUserInfo, refetch: fetchFormUserInfo } = useFormUserInfo();
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            sessionStorage.setItem("token", token.trim());
            fetchFormUserInfo();
        }
    }, [fetchFormUserInfo]);

    useEffect(() => {
        if (formUserInfo) {
            dispatch(setUser(formUserInfo));
            navigate("/");
        }
    }, [formUserInfo, navigate, dispatch]);

    return null;
};

export default FormLogin;
