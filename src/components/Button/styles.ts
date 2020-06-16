import styled, { css } from 'styled-components';

interface ContainerProps {
  buttonType: 'addButton' | 'normal';
}

export const Container = styled.button<ContainerProps>`
  ${props =>
    props.buttonType === 'addButton' &&
    css`
      position: absolute;
      top: 220px;
      padding: 10px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 140px;
      border: none;
      color: #665ffa;
      background: #fff;
      box-shadow: 0 3px 6px rgba(192, 208, 230, 0.8);
    `}
`;
