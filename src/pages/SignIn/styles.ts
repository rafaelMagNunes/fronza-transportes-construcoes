import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  div {
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 80%;
      padding: 15px;

      h1 {
        color: #666aff;
      }

      button {
        width: 100%;
        height: 56px;
        padding: 0 16px;
        border: none;
        background: #666aff;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
        animation: background-color 0.2s;

        &:hover {
          background: ${shade(0.1, '#666aff')};
        }
      }
    }
  }
`;
