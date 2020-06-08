import styled from 'styled-components';

interface ContainerStyleProps {
  padding?: string;
}

export const ContainerStyle = styled.div<ContainerStyleProps>`
  width: 90%;
  height: 100vh;
  margin-left: 70px;
  padding: ${props => props.padding || '40px'};
`;
