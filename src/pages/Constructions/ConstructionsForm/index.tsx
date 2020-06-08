/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { IconBaseProps } from 'react-icons';
import { FiHome, FiPlus, FiMapPin, FiCalendar } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../../utils/getValidationErrors';

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

const ConstructionForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { create } = useConstruction();
  const { addToast } = useToast();

  const breadcumbItens: BreadcumbIten[] = [
    {
      title: 'Obras',
      Icon: FiHome,
      path: '/construction',
      isSamePath: false,
    },
    {
      title: 'Adicionar Obra',
      Icon: FiPlus,
      path: '/constructions/form',
      isSamePath: true,
    },
  ];

  const handleSubmit = useCallback(
    async (data: ConstructionFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          construction: Yup.string().required(
            'O campo construção é obrigatório',
          ),
          address: Yup.string().required('Endereço é obrigatório'),
          start_date: Yup.date().required(
            'O campo data de início é obrigatório',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await create({
          construction: data.construction,
          address: data.address,
          startDate: data.start_date,
        });

        addToast({
          type: 'success',
          title: 'Obra cadastrada com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro da obra',
          description: 'Ocorreu um erro ao cadastrar obra, cheque os campos',
        });
      }
    },
    [create, addToast],
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
          Adicionar Obra
        </H1>
        <Breadcumb breadcumbItens={breadcumbItens} />
      </Header>
      <Card animationDirection="left" hasAnimation height="40vh">
        <H1 color="rgba(0, 0, 200, 0.30)" fontSize="35px">
          Formulário Obra
        </H1>
        <Form ref={formRef} onSubmit={handleSubmit}>
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

export default ConstructionForm;
