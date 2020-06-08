import React, { useRef, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import * as Yup from 'yup';
import {
  FiUsers,
  FiUser,
  FiPlus,
  FiMail,
  FiPhone,
  FiFile,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useSupplier } from '../../../hooks/supplier';
import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';

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

interface DataSupplier {
  name: string;
  email: string;
  cnpj: string;
  phone: string;
}

const SupplierForm: React.FC = () => {
  const { create } = useSupplier();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const breadcumbItens: BreadcumbIten[] = [
    {
      title: 'Fornecedores',
      Icon: FiUsers,
      path: '/supplier',
      isSamePath: false,
    },
    {
      title: 'Editar Fornecedor',
      Icon: FiPlus,
      path: '/suppliers/form',
      isSamePath: true,
    },
  ];

  const handleSubmit = useCallback(
    async (data: DataSupplier) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('O campo fornecedor é obrigatório'),
          email: Yup.string().required('O campo e-mail é obrigatório'),
          cnpj: Yup.string().required('O campo cnpj é obrigatório'),
          phone: Yup.string().required('O campo telefone é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, phone, cnpj } = data;

        await create({
          name,
          email,
          phone,
          cnpj,
        });

        addToast({
          type: 'success',
          title: 'Fornecedor cadastrado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro do fornecedor',
          description:
            'Ocorreu um erro ao cadastrar o fornecedor, cheque os campos',
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
          Adicionar Fornecedor
        </H1>
        <Breadcumb breadcumbItens={breadcumbItens} />
      </Header>
      <Card animationDirection="left" hasAnimation height="45vh">
        <H1 color="rgba(0, 0, 200, 0.30)" fontSize="35px">
          Formulário Fornecedor
        </H1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            padding="9px"
            iconSize={17}
            name="name"
            icon={FiUser}
            placeholder="Fornecedor"
          />
          <aside>
            <Input
              width="40%"
              padding="9px"
              iconSize={17}
              name="cnpj"
              icon={FiFile}
              placeholder="CNPJ"
            />
            <Input
              width="50%"
              padding="9px"
              iconSize={17}
              name="phone"
              icon={FiPhone}
              placeholder="Telefone"
            />
          </aside>
          <Input
            padding="9px"
            iconSize={17}
            name="email"
            icon={FiMail}
            placeholder="E-mail"
          />
          <Button type="submit">Salvar</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SupplierForm;
