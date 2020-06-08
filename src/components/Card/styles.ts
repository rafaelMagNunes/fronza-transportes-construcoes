/* eslint-disable no-nested-ternary */
import styled, { keyframes, css } from 'styled-components';

interface ContainerProps {
  width?: string;
  height?: string;
  hasAnimation?: boolean;
  animationDirection?: 'left' | 'right';
  boxShadow?: '1' | '2' | '3';
  margingTop?: string;
}

const shadows = {
  1: css`
    box-shadow: 0 3px 6px rgba(192, 208, 230, 0.8);
  `,
  2: css`
    box-shadow: 0 6px 12px rgba(192, 208, 230, 0.8);
  `,
  3: css`
    box-shadow: 0 12px 24px rgba(192, 208, 230, 0.8);
  `,
};

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

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div<ContainerProps>`
  background: #fff;
  width: ${props => props.width || '50vw'};
  height: ${props => props.height || '70vh'};
  border-radius: 5px;
  padding: 10px;
  margin-top: ${props => props.margingTop || '40px'};

  ${props => shadows[props.boxShadow || '1']}

  ${props =>
    props.hasAnimation
      ? props.animationDirection === 'left'
        ? css`
            animation: ${appearFromLeft} 1s;
          `
        : css`
            animation: ${appearFromRight} 1s;
          `
      : css`
          animation: none;
        `}
`;
