import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { IconBaseProps } from 'react-icons';
import {
  FiShoppingCart,
  FiPlus,
  FiCalendar,
  FiCreditCard,
  FiUser,
  FiHome,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import { useIten } from '../../hooks/iten';
import { useToast } from '../../hooks/toast';

import { Container } from './styles';

import H1 from '../../components/H1';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import Breadcumb from '../../components/Breadcumb';

interface BreadcumbIten {
  title: string;
  Icon: React.ComponentType<IconBaseProps>;
  path: string;
  isSamePath: boolean;
}

interface DataIten {
  description: string;
  payment_type: string;
  value: number;
  self_life_date: string | null;
  date: string;
  supplier: string;
  construction: string;
}

interface Supplier {
  id: string;
  name: string;
  phone: string;
  cnpj: string;
  email: string;
}

interface Constructions {
  id: string;
  construction: string;
  start_date: string;
  address: string;
}

interface SelectData {
  id: string;
  column: string;
}

const payment_type = [
  {
    id: 'à vista',
    column: 'à vista',
  },
  {
    id: 'dinheiro',
    column: 'dinheiro',
  },

  {
    id: 'a prazo',
    column: 'a prazo',
  },
  {
    id: 'cheque',
    column: 'cheque',
  },
  {
    id: 'cartão',
    column: 'cartão',
  },
];

const ItenForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [constructions, setConstructions] = useState<SelectData[]>([]);
  const [suppliers, setSuppliers] = useState<SelectData[]>([]);
  const [paymentType, setPaymentType] = useState<string>('à vista');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState<number>(1);

  const { create } = useIten();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadConstructions(): Promise<void> {
      const response = await api.get<Constructions[]>('/constructions', {
        params: {
          page,
          limit: 50,
          details: false,
        },
      });

      const array: SelectData[] = [];

      response.data.forEach(iten => {
        array.push({ id: iten.id, column: iten.construction });
      });

      setConstructions(array);
    }

    async function loadSuppliers(): Promise<void> {
      const response = await api.get<Supplier[]>('/suppliers', {
        params: {
          page,
          limit: 1500,
        },
      });

      const array: SelectData[] = [];

      response.data.forEach(iten => {
        array.push({ id: iten.id, column: iten.name });
      });

      setSuppliers(array);
    }

    loadConstructions();
    loadSuppliers();
  }, [setConstructions, page]);

  const breadcumbItens: BreadcumbIten[] = [
    {
      title: 'Adicionar Iten',
      Icon: FiPlus,
      path: '/itens/form',
      isSamePath: true,
    },
  ];

  const handleSubmit = useCallback(
    async (data: DataIten) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string().required('O campo descrição é obrigatório'),
          payment_type: Yup.string().required(
            'O campo pagamento é obrigatório',
          ),
          value: Yup.number().required('O campo valor é obrigatório'),
          date: Yup.date().required('O campo data é obrigatório'),
          self_life_date: Yup.date(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await create({
          date: data.date,
          description: data.description,
          supplier_id: data.supplier,
          payment_type: data.payment_type,
          self_life_date: data.self_life_date || null,
          value: data.value,
          construction_id: data.construction,
        });

        addToast({
          type: 'success',
          title: 'Cadastro efetuado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: 'Ocorreu um erro ao cadastrar, cheque os campos',
        });
      }
    },
    [create, addToast],
  );

  const handleChangePaymentTypeSelect = useCallback(
    event => {
      setPaymentType(event.target.value);
    },
    [setPaymentType],
  );

  return (
    <Container>
      <Header>
        <H1
          hasIcon
          iconColor="#666ffa"
          color="rgba(0, 0, 200, 0.30)"
          fontSize="40px"
        >
          Adicionar Iten
        </H1>
        <Breadcumb breadcumbItens={breadcumbItens} />
      </Header>
      <Card animationDirection="left" hasAnimation height="60vh">
        <H1 color="rgba(0, 0, 200, 0.30)" fontSize="35px">
          Formulário Iten
        </H1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TextArea
            padding="9px"
            iconSize={17}
            name="description"
            icon={FiShoppingCart}
            placeholder="Descrição"
          />
          <aside>
            <section>
              <Select
                width="90%"
                padding="9px"
                iconSize={17}
                name="supplier"
                icon={FiUser}
                data={suppliers}
              />
            </section>
            <section>
              <Select
                width="100%"
                padding="9px"
                iconSize={17}
                name="construction"
                icon={FiHome}
                data={constructions}
              />
            </section>
          </aside>
          <aside>
            <section>
              <Select
                width="90%"
                padding="9px"
                iconSize={17}
                name="payment_type"
                onChange={handleChangePaymentTypeSelect}
                icon={FiCreditCard}
                data={payment_type}
              />
            </section>
            <section>
              <Input
                width="100%"
                padding="9px"
                iconSize={17}
                name="value"
                icon={FiCreditCard}
                placeholder="Valor"
              />
            </section>
          </aside>
          <aside>
            <section>
              <p>Data:</p>
              <Input
                type="date"
                width={paymentType === 'à vista' ? '100%' : '90%'}
                padding="9px"
                iconSize={17}
                name="date"
                icon={FiCalendar}
                placeholder="Data"
              />
            </section>
            {paymentType === 'à vista' ? (
              <></>
            ) : (
              <section>
                <p>Vencimento Pagamento</p>
                <Input
                  width="100%"
                  type="date"
                  padding="9px"
                  iconSize={17}
                  name="self_life_date"
                  icon={FiCalendar}
                  placeholder="Vencimento Pagamento"
                />
              </section>
            )}
          </aside>

          <Button type="submit">Salvar</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ItenForm;
