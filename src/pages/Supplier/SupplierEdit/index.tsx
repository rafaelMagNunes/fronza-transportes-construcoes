import React, { useRef, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
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
  const { supplier, update } = useSupplier();
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
      path: '/supplieredit',
      isSamePath: true,
    },
  ];

  const handleSubmit = useCallback(
    async (data: DataSupplier) => {
      try {
        formRef.current?.setErrors({});

        const { name, email, phone, cnpj } = data;

        await update({
          id: supplier.id,
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
        addToast({
          type: 'error',
          title: 'Erro na edição do fornecedor',
          description:
            'Ocorreu um erro ao editar o fornecedor, cheque os campos',
        });
      }
    },
    [update, addToast, supplier.id],
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
          Editar Fornecedor
        </H1>
        <Breadcumb breadcumbItens={breadcumbItens} />
      </Header>
      <Card animationDirection="left" hasAnimation height="45vh">
        <H1 color="rgba(0, 0, 200, 0.30)" fontSize="35px">
          Formulário Fornecedor
        </H1>
        <Form initialData={supplier} onSubmit={handleSubmit}>
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
