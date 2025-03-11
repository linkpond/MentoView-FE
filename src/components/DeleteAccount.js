import styled from "styled-components";

const TabContentItem = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

const DeleteAccount = () => {
    return (
        <TabContentItem>
            회원 탈퇴 화면
        </TabContentItem>
    );
};

export default DeleteAccount;