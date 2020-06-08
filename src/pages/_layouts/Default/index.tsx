import React from 'react';

import SideBar from '../../../components/SideBar';
import Container from '../../../components/Container';

import { Wrapper } from './styles';

interface DefaultLayoutProps {
  location: string;
}

const DefaulyLayout: React.FC<DefaultLayoutProps> = ({
  children,
  location,
}) => {
  return (
    <Wrapper>
      <SideBar pathname={location} />
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default DefaulyLayout;
