import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackBtn = styled(FaChevronLeft)`
    z-index: 995;
    position: fixed;
    bottom: 70px;
    right: 50px;
    background-color: transparent;
    border: 3.5px solid var(--main-color);
    font-size: 50px;
    color: var(--main-color);
    border-radius: 100%;
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        right: 60px;
        border: 2px solid transparent;
        color: #555;
    }
    @media (max-width: 600px) {
        display: none;
    }
`

const Back = () => {
    const navigate = useNavigate();
    return (
        <BackBtn onClick={() => {navigate(-1); window.scrollTo(0, 0); }} />
    )
};

export default Back;