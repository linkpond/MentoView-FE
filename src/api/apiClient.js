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

            if (!originalRequest._retryCount) {
                originalRequest._retryCount = 0;
            }

            if ((status === 401 || status === 500) && originalRequest._retryCount < 1) {
                originalRequest._retryCount += 1;

                try {
                    const response = await apiClient.post("/api/token/access");
                    if (response.status === 200 && response.headers["authorization"]) {
                        const newToken = response.headers["authorization"].replace("Bearer ", "");
                        sessionStorage.setItem("token", newToken);

                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                        return apiClient(originalRequest);
                    }
                } catch (refreshError) {
                    console.error("토큰 갱신 실패:", refreshError);
                }
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
