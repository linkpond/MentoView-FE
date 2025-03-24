import axios from "axios";
import store from "../redux/store";
import { setUser } from "../redux/authSlice";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const dispatch = store.dispatch;

        if (error.response) {
            const status = error.response.status;
            const errorMessage = error.response.data;

            if (!originalRequest._retryCount) {
                originalRequest._retryCount = 0;
            }

            if ((status === 401 || status === 500) && originalRequest._retryCount < 1) {
                originalRequest._retryCount += 1;

                try {
                    const response = await apiClient.post("/api/post/access");
                    if (response.status === 200 && response.headers["authorization"]) {
                        const newToken = response.headers["authorization"].replace("Bearer ", "");
                        apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                        return apiClient(originalRequest);
                    }
                } catch (refreshError) {
                    console.error("토큰 갱신 실패:", refreshError);
                }
            }

            if (status === 400) {
                if (errorMessage === "refresh token null") {
                    alert("리프레시 토큰이 존재하지 않습니다. 다시 로그인해주세요.");
                } else if (errorMessage === "refresh token expired") {
                    alert("리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.");
                }
                sessionStorage.clear();
                dispatch(setUser(null));
                window.location.href = "/login";
            }

            if (status === 401) {
                alert("토큰 만료로 인해 로그아웃됩니다.");
                sessionStorage.clear();
                dispatch(setUser(null));
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


export default apiClient;
