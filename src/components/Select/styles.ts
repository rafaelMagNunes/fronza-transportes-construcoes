import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
  padding: string;
  width?: string;
}

export const Container = styled.div<ContainerProps>`
  border: none;
  width:  ${props => props.width || '100%'};
  background: #f9f9f9;
  color: rgba(0, 0, 0, 0.4);
  border: 2px solid #f9f9f9;
  padding: ${props => props.padding};
  border-radius: 4px;

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #ff7772;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #666aff;
      border-color: #666aff;
    `}

  ${props =>
    props.isField &&
    css`
      color: #666aff;
    `}

  select {
    flex: 1;
    border: 0;
    background: transparent;
    color: rgba(0, 0, 0, 1);

    ::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #ff7772;

    &::before {
      border-color: #ff7772 transparent;
    }
  }
`;
