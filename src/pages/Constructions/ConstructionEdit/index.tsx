/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiHome, FiPlus, FiMapPin, FiCalendar } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useConstruction } from '../../../hooks/construction';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

import H1 from '../../../components/H1';
import Card from '../../../components/Card';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Breadcumb from '../../../components/Breadcumb';

interface BreadcumbIten {
  title: string;
  Icon: React.ComponentType<IconBaseProps>;
  path: string;
  isSamePath: boolean;
}

interface ConstructionFormData {
  address: string;
  construction: string;
  start_date: string;
}

const ConstructionEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { update, construction } = useConstruction();
  const { addToast } = useToast();

  const breadcumbItens: BreadcumbIten[] = [
    {
      title: 'Obras',
      Icon: FiHome,
      path: '/construction',
      isSamePath: false,
    },
    {
      title: 'Editar Obra',
      Icon: FiPlus,
      path: '/constructionedit',
      isSamePath: true,
    },
  ];

  const handleSubmit = useCallback(
    async (data: ConstructionFormData) => {
      try {
        await update({
          id: construction.id,
          construction: data.construction,
          address: data.address,
          start_date: data.start_date,
        });

        addToast({
          type: 'success',
          title: 'Obra editado com sucesso',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar obra',
          description: 'Ocorreu um erro ao editar a obra, cheque os campos',
        });
      }
    },
    [update, addToast, construction.id],
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
          Editar Obra
        </H1>
        <Breadcumb breadcumbItens={breadcumbItens} />
      </Header>
      <Card animationDirection="left" hasAnimation height="40vh">
        <H1 color="rgba(0, 0, 200, 0.30)" fontSize="35px">
          Formulário Obra
        </H1>
        <Form initialData={construction} ref={formRef} onSubmit={handleSubmit}>
          <Input
            padding="9px"
            iconSize={17}
            name="construction"
            icon={FiHome}
            placeholder="Obra"
          />
          <aside>
            <Input
              width="50%"
              padding="9px"
              iconSize={17}
              name="address"
              icon={FiMapPin}
              placeholder="Endereço"
            />
            <Input
              width="40%"
              type="date"
              padding="9px"
              iconSize={17}
              name="start_date"
              icon={FiCalendar}
              placeholder="Data de Início"
            />
          </aside>
          <Button type="submit">Salvar</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ConstructionEdit;
