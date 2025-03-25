import { useEffect } from "react";
import styled from "styled-components";

const KakaoChatBox = styled.div`
    z-index: 995;
    position: fixed;
    right: 50px;
    bottom: 10px;
    width: fit-content;
    height: fit-content;
    @media (max-width: 600px) {
        right: 10px;
    }
`;

const Kakao = () => {
    useEffect(() => {
        if (!window.Kakao) return;

        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.REACT_APP_KAKAO_MAP_KEY);
        }

        if (!document.querySelector("#chat-channel-button iframe")) {
            window.Kakao.Channel.createChatButton({
                container: "#chat-channel-button",
                channelPublicId: "_Nxfvnn",
            });
        }
    }, []);

    return (
        <KakaoChatBox>
            <div id="chat-channel-button"></div>
        </KakaoChatBox>
    );
};

export default Kakao;
