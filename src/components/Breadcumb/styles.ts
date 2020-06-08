import styled, { css, keyframes } from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

interface AProps extends LinkProps {
  color?: string;
  issamepath: boolean;
}

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

export const Container = styled.div`
  margin-top: 20px;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: #fefefe;
  padding: 9px;
  border-radius: 4px;
  animation: ${appearFromLeft} 1s;
`;

export const A = styled(Link)<AProps>`
  margin-left: 4px;
  font-size: 18px;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  p {
    margin-left: 8px;
  }

  ${props =>
    props.issamepath
      ? css`
          color: ${props.color || '#666ffa'};
        `
      : css`
          color: ${props.color || '#9aaabe'};
        `}
`;
