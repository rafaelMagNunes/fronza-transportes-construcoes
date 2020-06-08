import styled, { keyframes, css } from 'styled-components';

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

interface H1StyleProps {
  color?: string;
  iconColor?: string;
  fontSize?: string;
  hasAnimation?: boolean;
}

export const H1Style = styled.h1<H1StyleProps>`
  display: flex;
  align-items: flex-start;
  color: ${props => props.color};
  font-size: ${props => props.fontSize};

  ${props =>
    props.hasAnimation &&
    css`
      animation: ${appearFromLeft} 1s;
    `}

  svg {
    margin-right: 7px;
    color: ${props => props.iconColor};
    font-size: ${props => props.fontSize};
  }
`;
