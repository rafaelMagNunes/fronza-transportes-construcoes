import styled, { css, keyframes } from 'styled-components';

interface ContainerProps {
  hasAnimation?: boolean;
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

export const Container = styled.div<ContainerProps>`
  margin-top: 40px;
  width: 100%;

  ${props =>
    props.hasAnimation &&
    css`
      animation: ${appearFromLeft} 1s;
    `}

  input {
    margin-bottom: 10px;
    width: 40%;
    padding: 5px;
    border: 2px solid #fff;
    border-radius: 5px;

    :focus {
      border: 2px solid #666ffa;
    }
  }

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      background: #666ffa;
      color: #fff;
      font-weight: 600;
      padding: 10px 32px;
      text-align: left;
      font-size: 14px;
      line-height: 24px;
      max-width: 200px;
    }

    td {
      padding: 12px 32px;
      border: 0;
      background: #fff;
      font-size: 14px;
      font-weight: normal;
      color: #969cb3;
      max-width: 200px;

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }

      svg {
        cursor: pointer;

        :not(:first-child) {
          margin-left: 14px;
        }

        &.edit {
          color: #ffe98c;
        }

        &.remove {
          color: #ff5f59;
        }
      }
    }

    td:first-child {
      border-radius: 4px 0 0 4px;
    }

    td:last-child {
      border-radius: 0 4px 4px 0;
    }

    th:first-child {
      border-radius: 4px 0 0 4px;
    }

    th:last-child {
      border-radius: 0 4px 4px 0;
    }
  }
`;
