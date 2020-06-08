import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiHome, FiPlus, FiCalendar } from 'react-icons/fi';

import H1 from '../../components/H1';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Breadcumb from '../../components/Breadcumb';
import Table from '../../components/ConstructionDetailTable';

import { Container } from './styles';

interface BreadcumbIten {
  title: string;
  Icon: React.ComponentType<IconBaseProps>;
  path: string;
  isSamePath: boolean;
}

const ConstructionDetails: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [startDate, setStartDate] = useState<Date>(
    new Date('2010-06-04T13:13:05.883Z'),
  );
  const [endDate, setEndDate] = useState<Date>(new Date());

  const breadcumbItens: BreadcumbIten[] = [
    {
      title: 'Obras',
      Icon: FiHome,
      path: '/construction',
      isSamePath: true,
    },
  ];

  const handleSubmit = useCallback(
    data => {
      setStartDate(data.start_date);
      setEndDate(data.end_date);
    },
    [setStartDate, setEndDate],
  );

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
      <Form onSubmit={handleSubmit} ref={formRef}>
        <section>
          <p>Data Início:</p>
          <Input
            type="date"
            width="90%"
            padding="9px"
            iconSize={17}
            name="start_date"
            icon={FiCalendar}
            placeholder="Data Início"
          />
        </section>
        <section>
          <p>Data Fim:</p>
          <Input
            type="date"
            width="90%"
            padding="9px"
            iconSize={17}
            name="end_date"
            icon={FiCalendar}
            placeholder="Data Fim"
          />
        </section>
        <Button type="submit">Pesquisar</Button>
      </Form>

      <Table startDate={startDate} endDate={endDate} />

      <Link to="/constructions/form">
        <Button buttonType="addButton">
          <FiPlus size={33} />
        </Button>
      </Link>
    </Container>
  );
};

export default ConstructionDetails;
