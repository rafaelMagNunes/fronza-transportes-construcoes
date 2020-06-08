import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  form {
    margin-top: 10px;
    position: relative;
    height: 30vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    aside {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    button {
      width: 100%;
      border: none;
      background: #666ffa;
      color: #fff;
      padding: 9px;
      border-radius: 4px;
      font-weight: 600;
      animation: background-color 0.2s;

      &:hover {
        background: ${shade(0.1, '#666aff')};
      }
    }
  }
`;
