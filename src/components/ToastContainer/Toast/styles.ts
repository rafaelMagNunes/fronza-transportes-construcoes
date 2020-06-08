import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'info' | 'success' | 'warn' | 'error';
  hasDescription: boolean;
}

const toastTypeVariations = {
  info: css`
    color: rgba(0, 0, 0, 0.5);
    background: #666ffa;
  `,
  success: css`
    color: rgba(0, 0, 0, 0.5);
    background: #59ff93;
  `,
  warn: css`
    color: rgba(0, 0, 0, 0.5);
    background: #ffe98c;
  `,
  error: css`
    color: rgba(0, 0, 0, 0.5);
    background: #ff5f59;
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(192, 208, 230, 0.8);

  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 15px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
