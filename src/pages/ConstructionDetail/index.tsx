import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiHome, FiPlus, FiSearch, FiCalendar } from 'react-icons/fi';

import { useConstruction } from '../../hooks/construction';

import H1 from '../../components/H1';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Breadcumb from '../../components/Breadcumb';
import Table from '../../components/ConstructionDetailTable';
import Select from '../../components/Select';

import { Container } from './styles';
import api from '../../services/api';

interface BreadcumbIten {
  title: string;
  Icon: React.ComponentType<IconBaseProps>;
  path: string;
  isSamePath: boolean;
}

interface Supplier {
  name: string;
  phone: string;
  cnpj: string;
  cep: string;
  state: string;
  city: string;
  address: string;
  email: string;
}

interface Iten {
  id: string;
  description: string;
  payment_type: string;
  value: number;
  self_life_date: string;
  date: string;
  supplier: Supplier;
}

interface SelectData {
  id: string;
  column: string;
}

const array: SelectData[] = [
  {
    id: 'all',
    column: 'Todos',
  },
  {
    id: 'today',
    column: 'Hoje',
  },
  {
    id: 'tomorrow',
    column: 'Amanhã',
  },
  {
    id: 'this week',
    column: 'Esta semana',
  },
  {
    id: 'this month',
    column: 'Este mês',
  },
];

const ConstructionDetails: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [data, setData] = useState<Iten[] | undefined>();
  const [time, setTime] = useState<string>('all');

  const { construction } = useConstruction();

  const breadcumbItens: BreadcumbIten[] = [
    {
      title: 'Obras',
      Icon: FiHome,
      path: '/construction',
      isSamePath: true,
    },
  ];

  const handleSearch = useCallback(
    async data => {
      const response = await api.get<Iten[] | undefined>(
        `/itens/${data.target.value}`,
        {
          params: {
            id: construction.id,
          },
        },
      );

      if (response.data?.length === 0) {
        setData([]);
      } else {
        setData(response.data);
      }
    },
    [setData, construction],
  );

  const handleChangeTime = useCallback(
    async data => {
      const time = data.target.value;

      const response = await api.get<Iten[] | undefined>(
        `/itens/bytime/${construction.id}`,
        {
          params: {
            time,
          },
        },
      );

      setData(response.data);
      setTime(time);
    },
    [setData, construction, setTime],
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
      <Form onSubmit={() => false} ref={formRef}>
        <Input
          icon={FiSearch}
          size={20}
          name="search"
          padding="4px"
          width="40%"
          placeholder="Pesquisar ..."
          onChange={handleSearch}
        />
        <Select
          onChange={handleChangeTime}
          data={array}
          name="time"
          padding="4px"
          width="40%"
        />
      </Form>

      <Table data={data} time={time} />

      <Link to="/constructions/form">
        <Button buttonType="addButton">
          <FiPlus size={33} />
        </Button>
      </Link>
    </Container>
  );
};

export default ConstructionDetails;
