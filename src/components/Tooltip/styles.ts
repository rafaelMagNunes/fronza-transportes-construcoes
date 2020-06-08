import styled, { css } from 'styled-components';

interface ContainerProps {
  alignProp?: 'top' | 'left' | 'bottom' | 'right';
  hasArrow: boolean;
  widthProp: string;
  left?: string;
  right?: string;
}

const aligns = {
  top: css`
    position: absolute;
    bottom: calc(100% + 12px);
    left: 44%;
    transform: translateX(-50%);
  `,
  left: css`
    position: absolute;
    left: calc(100% + 12px);
    left: 50%;
    transform: translateX(20%);
  `,
  bottom: css`
    position: absolute;
    top: calc(100% + 12px);
    left: 56%;
    transform: translateX(-50%);
  `,
  right: css`
    position: absolute;
    right: calc(100% + 12px);
    transform: translateX(-20%);
  `,
};

const arrowsAlign = {
  top: css`
    content: '';
    border-style: solid;
    border-color: #666aff transparent;
    border-width: 6px 6px 0 6px;
    top: 100%;
    position: absolute;
    left: 50%;
  `,
  left: css`
    content: '';
    border-style: solid;
    border-color: #666aff transparent;
    border-width: 6px 6px 0px 6px;
    transform: rotate(90deg);
    right: 97%;
    position: absolute;
    top: 43%;
  `,
  bottom: css`
    content: '';
    border-style: solid;
    border-color: #666aff transparent;
    border-width: 6px 6px 0px 6px;
    transform: rotate(180deg);
    bottom: 100%;
    position: absolute;
    right: 50%;
  `,
  right: css`
    content: '';
    border-style: solid;
    border-color: #666aff transparent;
    border-width: 6px 6px 0px 6px;
    transform: rotate(270deg);
    left: 97%;
    position: absolute;
    top: 43%;
  `,
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  
  span {
    width: ${props => props.widthProp};
    background: #666aff;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    ${props => aligns[props.alignProp || 'top']}

    ${props =>
      props.alignProp === 'left' ||
      props.alignProp === 'top' ||
      props.alignProp === 'bottom'
        ? css`
            left: ${props.left};
          `
        : css`
            right: ${props.right};
          `}

    ${props =>
      props.hasArrow &&
      css`
        &::before {
          ${arrowsAlign[props.alignProp || 'top']}
        }
      `}
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
