import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContentProps {
  isSelected?: boolean;
}

export const Container = styled.div`
  height: 100%;
  width: 70px;
  background: #fff;
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  padding: 0 0 14px 0;
  box-shadow: 0 4px 8px 0 rgba(192, 208, 230, 0.8);

  nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ul {
      width: 100%;
      height: 35%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
    }
  }
`;

export const Content = styled.li<ContentProps>`
  padding: 5px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;

  ${props =>
    props.isSelected &&
    css`
      background: rgba(0, 0, 200, 0.09);
    `}

  a {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    :hover {
      i {
        color: #666ffa;
      }

      label {
        color: #3742fa;
      }
    }

    i {
      color: ${props => props.color};
    }

    label {
      color: ${props => props.color};
    }
  }
`;

export const Icon = styled(Tooltip)``;
