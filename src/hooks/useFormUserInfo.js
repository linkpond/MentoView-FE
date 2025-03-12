import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { setUser } from "../redux/authSlice";

const fetchFormUserInfo = async () => {
    const token = sessionStorage.getItem("token")?.trim();
    console.log(token);
    if (!token) throw new Error("No token");

    const { data } = await axios.get("https://mentoview.site/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
    });

    return data;
};

export const useFormUserInfo = () => {
    const dispatch = useDispatch();

    return useQuery({
        queryKey: ["formUserInfo"],
        queryFn: async () => {
            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                dispatch(setUser(user));
                return user;
            }
            const data = await fetchFormUserInfo();
            dispatch(setUser(data));
            return data;
        },
        enabled: true,
    });
};
