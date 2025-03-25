import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VideoService = () => {
    const navigate = useNavigate();
    useEffect(() => {
        alert("준비중인 서비스입니다");
        navigate("/")
    }, [navigate]);

    return null;
};

export default VideoService;