import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  height: 180px;
  background: #fff;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(192, 208, 230, 0.8);

  h1 {
    color: #3743fa;
  }

  p {
    margin-top: 10px;
    margin-bottom: 2px;
    font-size: 18px;
    font-weight: 200;

    &.address {
      font-style: italic;
    }
  }

  aside {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    p {
      font-size: 18px;
      font-weight: 200;

      &.column {
        font-weight: 400;
        color: #000;
      }
    }
  }

  footer {
    width: 100%;
    border-top: 1px solid #eee;
    padding-top: 7px;
    margin-top: 12px;

    svg {
      cursor: pointer;
    }
  }
`;
