import styled from "styled-components";

export const FlexBox = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
`;
