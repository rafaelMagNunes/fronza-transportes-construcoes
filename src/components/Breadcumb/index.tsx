import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Container, A } from './styles';

interface BreadcumbIten {
  title: string;
  Icon: React.ComponentType<IconBaseProps>;
  path: string;
  isSamePath: boolean;
}

interface BreadcumbProps {
  breadcumbItens: BreadcumbIten[];
  color?: string;
}

const Breadcumb: React.FC<BreadcumbProps> = ({ breadcumbItens, color }) => {
  const pathname = localStorage.getItem('@FronzaTransportes:pathname');

  console.log(pathname);

  return (
    <Container color={color}>
      {breadcumbItens.map(iten => (
        <A issamepath={iten.isSamePath} to={iten.path}>
          <iten.Icon size={18} />
          <p>{iten.title}</p>
          <p>/</p>
        </A>
      ))}
    </Container>
  );
};

export default Breadcumb;
