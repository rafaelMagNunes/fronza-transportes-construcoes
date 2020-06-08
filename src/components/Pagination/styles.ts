import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  p {
    color: #666ffa;
    font-weight: 500;
    font-size: 20px;
  }

  svg {
    cursor: pointer;

    &.left {
      margin-right: 15px;
    }

    &.right {
      margin-left: 15px;
    }
  }
`;
