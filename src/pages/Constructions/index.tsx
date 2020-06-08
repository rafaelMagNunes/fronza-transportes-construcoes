import React from 'react';
import { Link } from 'react-router-dom';
import { IconBaseProps } from 'react-icons';
import { FiHome, FiPlus } from 'react-icons/fi';

import H1 from '../../components/H1';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Breadcumb from '../../components/Breadcumb';
import Table from '../../components/ConstructionTable';

import { Container } from './styles';

interface BreadcumbIten {
  title: string;
  Icon: React.ComponentType<IconBaseProps>;
  path: string;
  isSamePath: boolean;
}

const Construction: React.FC = () => {
  const breadcumbItens: BreadcumbIten[] = [
    {
      title: 'Obras',
      Icon: FiHome,
      path: '/construction',
      isSamePath: true,
    },
  ];

  return (
    <Container>
      <Header>
        <H1
          hasAnimation
          iconColor="#666ffa"
          color="rgba(0, 0, 200, 0.30)"
          fontSize="40px"
        >
          Obras
        </H1>
        <Breadcumb breadcumbItens={breadcumbItens} />
      </Header>

      <Table />

      <Link to="/constructions/form">
        <Button buttonType="addButton">
          <FiPlus size={33} />
        </Button>
      </Link>
    </Container>
  );
};

export default Construction;
