import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div``;

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  animation: ${appearFromLeft} 1s;
`;

export const Grid = styled.div`
  margin-top: 30px;
  display: grid;
  width: 100%;
  grid-template-columns: 25% 25%;
  grid-column-gap: 10px;
  grid-row-gap: 0;
`;

export const Divider = styled.div`
  height: 80vh;
  width: 2px;
  margin-left: 50px;
  background: rgba(0, 0, 0, 0.09);
`;
