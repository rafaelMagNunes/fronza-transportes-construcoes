import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiHome, FiPlus, FiSearch, FiCalendar } from 'react-icons/fi';

import { useConstruction } from '../../hooks/construction';

import formatValue from '../../utils/formatValue';

import H1 from '../../components/H1';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Breadcumb from '../../components/Breadcumb';
import Table from '../../components/ConstructionDetailTable';
import Select from '../../components/Select';

import { Container, Value } from './styles';
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

interface Constructions {
  construction: string;
  start_date: string;
  address: string;
  iten: Iten[];
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
  const [constructions, setConstructions] = useState<Constructions>();

  const { id } = useConstruction();

  useEffect(() => {
    async function loadConstructions(): Promise<void> {
      const response = await api.get<Constructions>(
        `/constructions/byid/${id}`,
        {
          params: {
            details: 'true',
          },
        },
      );

      setConstructions(response.data);
    }

    loadConstructions();
  }, [setConstructions, id, data]);

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
            id,
          },
        },
      );

      if (response.data?.length === 0) {
        setData([]);
      } else {
        setData(response.data);
      }
    },
    [setData, id],
  );

  const handleChangeTime = useCallback(
    async data => {
      const time = data.target.value;

      const response = await api.get<Iten[] | undefined>(
        `/itens/bytime/${id}`,
        {
          params: {
            time,
          },
        },
      );

      setData(response.data);
      setTime(time);
    },
    [setData, id, setTime],
  );

  function getValue(itens: Iten[] | undefined): string {
    let total = 0;

    if (itens) {
      itens.forEach(iten => {
        total += Number(iten.value);
      });
    }

    return formatValue(total);
  }

  const value = useMemo(() => getValue(constructions?.iten), [constructions]);

  return (
    <Container>
      <Header>
        <H1
          hasAnimation
          iconColor="#666ffa"
          color="rgba(0, 0, 200, 0.30)"
          fontSize="40px"
        >
          Itens da Obra
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
      <Value>
        <h6>Valor Total:</h6>

        <h6>{value}</h6>
      </Value>

      <Table data={data} time={time} constructions={constructions} />

      <Link to="/constructions/form">
        <Button buttonType="addButton">
          <FiPlus size={33} />
        </Button>
      </Link>
    </Container>
  );
};

export default ConstructionDetails;
