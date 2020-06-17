import React, { useRef, useCallback, useState, useEffect } from 'react';
import { IconBaseProps } from 'react-icons';
import {
  FiUsers,
  FiUser,
  FiPlus,
  FiMail,
  FiPhone,
  FiFile,
  FiMapPin,
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
import Select from '../../../components/Select';

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
  cep: string;
  state: string;
  city: string;
  address: string;
}

interface LocationData {
  state?: string;
  city?: string;
}

const optionsState = [
  { id: 'AC', column: 'Acre' },
  { id: 'AL', column: 'Alagoas' },
  { id: 'AP', column: 'Amapá' },
  { id: 'AM', column: 'Amazonas' },
  { id: 'BA', column: 'Bahia' },
  { id: 'CE', column: 'Ceará' },
  { id: 'DF', column: 'Distrito Federal' },
  { id: 'ES', column: 'Espírito Santo' },
  { id: 'GO', column: 'Goiás' },
  { id: 'MA', column: 'Maranhão' },
  { id: 'MT', column: 'Mato Grosso' },
  { id: 'MS', column: 'Mato Grosso do Sul' },
  { id: 'MG', column: 'Minas Gerais' },
  { id: 'PA', column: 'Pará' },
  { id: 'PB', column: 'Paraíba' },
  { id: 'PR', column: 'Paraná' },
  { id: 'PE', column: 'Pernambuco' },
  { id: 'PI', column: 'Piauí' },
  { id: 'RJ', column: 'Rio de Janeiro' },
  { id: 'RN', column: 'Rio Grande do Norte' },
  { id: 'RS', column: 'Rio Grande do Sul' },
  { id: 'RO', column: 'Rondônia' },
  { id: 'RR', column: 'Roraima' },
  { id: 'SC', column: 'Santa Catarina' },
  { id: 'SP', column: 'São Paulo' },
  { id: 'SE', column: 'Sergipe' },
  { id: 'TO', column: 'Tocantins' },
  { id: 'EX', column: 'Estrangeiro' },
];

const SupplierForm: React.FC = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    city: '',
    state: 'AC',
  });

  const { supplier, update } = useSupplier();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    setLocationData({ city: supplier.city, state: supplier.state });
  }, [setLocationData, supplier]);

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

  const handleState = useCallback(
    data => {
      setLocationData({ state: data.target.value });
    },
    [setLocationData],
  );

  const handleCity = useCallback(
    data => {
      setLocationData({ city: data.target.value });
    },
    [setLocationData],
  );

  const handleFindCep = useCallback(
    data => {
      const cep: string = data.target.value;

      try {
        const url = `https://viacep.com.br/ws/${cep}/json/`.replace(
          `${cep}`,
          cep,
        );
        fetch(url).then(res => {
          if (res.ok) {
            res.json().then(json => {
              const city: string = json.localidade;
              const state: string = json.uf;

              setLocationData({ state, city });
            });
          }
        });
      } catch (err) {
        // console.log(err);
      }
    },
    [setLocationData],
  );

  const handleSubmit = useCallback(
    async (data: DataSupplier) => {
      try {
        formRef.current?.setErrors({});

        const { name, email, phone, cnpj, cep, state, city, address } = data;

        await update({
          id: supplier.id,
          name,
          email,
          phone,
          cnpj,
          cep,
          state,
          city,
          address,
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
          <aside>
            <Input
              width="30%"
              padding="9px"
              iconSize={17}
              name="cep"
              icon={FiMapPin}
              onChange={handleFindCep}
              placeholder="CEP"
            />
            <Select
              width="30%"
              data={optionsState}
              padding="9px"
              iconSize={17}
              name="state"
              icon={FiMapPin}
              value={locationData.state}
              onChange={handleState}
            />
            <Input
              width="30%"
              padding="9px"
              iconSize={17}
              name="city"
              icon={FiMapPin}
              placeholder="Cidade"
              value={locationData.city}
              onChange={handleCity}
            />
          </aside>
          <aside>
            <Input
              width="50%"
              padding="9px"
              iconSize={17}
              name="email"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              width="40%"
              padding="9px"
              iconSize={17}
              name="address"
              icon={FiMapPin}
              placeholder="Endereço"
            />
          </aside>
          <Button type="submit">Salvar</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SupplierForm;
