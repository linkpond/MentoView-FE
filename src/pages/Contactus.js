import { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, MapMarker, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";

const ContactusBox = styled.div`
    width: 100%;
    height: calc(100vh - 65px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 200px;
    @media (max-width: 1500px) {
        padding: 0px 50px;
    }
    @media (max-width: 1200px) {
        padding: 50px 20px 00px 20px;
        align-items: start;
    }
`;

const StyledMap = styled.div`
    max-width: 700px;
    width: 100%;
    height: auto;
    aspect-ratio: 7 / 4;
    border-radius: 8px;
    box-shadow: 0px 10px 10px 1px rgba(0, 0, 0, 0.2);
    @media (max-width: 1200px) {
        max-width: 80%;
    }
    @media (max-width: 750px) {
        max-width: 100%;
    }
`;

const KakaoMap = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mapCenter, setMapCenter] = useState(null);

    useEffect(() => {
        const loadKakaoMap = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => setIsLoaded(true));
            } else {
                const script = document.createElement("script");
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=true&libraries=services`;
                script.async = true;
                script.onload = () => {
                    window.kakao.maps.load(() => setIsLoaded(true));
                };
                document.head.appendChild(script);
            }
        };

        loadKakaoMap();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setMapCenter(new window.kakao.maps.LatLng(37.6342, 126.7158));
        }
    }, [isLoaded]);

    if (!isLoaded || !mapCenter) return <p>지도를 불러오는 중...</p>;

    return (
        <StyledMap>
            <Map center={{ lat: mapCenter.getLat(), lng: mapCenter.getLng() }} level={5} style={{ width: "100%", height: "100%" }}>
                <MapMarker position={{ lat: mapCenter.getLat(), lng: mapCenter.getLng() }} />
                <MapTypeControl position="TOPRIGHT" />
                <ZoomControl position="RIGHT" />
            </Map>
        </StyledMap>
    );
};

const MapBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .location-box {
        width: 350px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: start;

        .lo-text {
            font-weight: bold;
            margin: 5px 0 20px 0;
        }

        .sz {
            font-size: 12px;
        }

        .icon {
            color: var(--main-color) !important;
        }
    }
    @media (max-width: 1200px) {
        flex-direction: column-reverse;
        .location-box {
            width: 700px;
            height: fit-content;
        }
    }
    @media (max-width: 750px) {
        flex-direction: column-reverse;
        .location-box {
            width: 100%;
            height: fit-content;
        }
    }
`;

const Edge = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 13px;
    background-color: #ddd;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 10px;
`;

const Contactus = () => {
    return (
        <ContactusBox>
            <MapBox>
                <KakaoMap />
                <div className="location-box">
                    <Edge>Address</Edge>
                    <span className="lo-text"><FaLocationDot className="icon" />서울 종로구 종로3길17, 광화문D타워 D1동 16층, 17층</span>
                    <Edge>Email</Edge>
                    <span className="lo-text"><IoMailSharp className="icon" />contact@likelion.net</span>
                    <Edge>Tel</Edge>
                    <span className="lo-text"><FaPhoneFlip className="icon sz" /> 010-1234-5678</span>
                </div>
            </MapBox>
        </ContactusBox>
    );
};

export default Contactus;
