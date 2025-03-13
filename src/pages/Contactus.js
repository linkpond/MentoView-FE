import { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, MapMarker, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";

const ContactusBox = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 200px;
`;

const StyledMap = styled.div`
    width: 700px;
    height: 400px;
    border-radius: 8px;
    box-shadow: 0px 10px 10px 1px rgba(0, 0, 0, 0.2);
`;

const KakaoMap = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mapCenter, setMapCenter] = useState({ lat: 37.6342, lng: 126.7158 });

    useEffect(() => {
        const loadKakaoMap = () => {
            if (window.kakao && window.kakao.maps) {
                setIsLoaded(true);
            } else {
                const script = document.createElement("script");
                const kakaoApiKey = process.env.REACT_APP_KAKAO_MAP_KEY;
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false&libraries=services`;
                script.async = true;
                script.onload = () => {
                    window.kakao.maps.load(() => {
                        setIsLoaded(true);
                    });
                };
                document.head.appendChild(script);
            }
        };

        loadKakaoMap();
    }, []);

    if (!isLoaded) return <p>지도를 불러오는 중...</p>;

    return (
        <StyledMap>
            <Map center={mapCenter} level={5} style={{ width: "100%", height: "100%" }}>
                <MapMarker position={mapCenter} />
                <MapTypeControl position="TOPRIGHT" />
                <ZoomControl position="RIGHT" />
            </Map>
        </StyledMap>
    );
};

const MapBox = styled.div`
    margin: 50px 0;
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
                    <span className="lo-text"><FaLocationDot className="icon"/> Cloud-Engineering2</span>
                    <Edge>Email</Edge>
                    <span className="lo-text"><IoMailSharp className="icon"/> abcdefg@gmail.com</span>
                    <Edge>Tel</Edge>
                    <span className="lo-text"><FaPhoneFlip className="icon sz" /> 010-1234-5678</span>
                </div>
            </MapBox>
        </ContactusBox>
    );
};

export default Contactus;
