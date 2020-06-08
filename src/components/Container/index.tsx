import React from 'react';

import { ContainerStyle } from './styles';

interface ContainerProps {
  padding?: string;
}

const Container: React.FC<ContainerProps> = ({ children, padding }) => (
  <ContainerStyle padding={padding}>{children}</ContainerStyle>
);

export default Container;
