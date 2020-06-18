/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useRef, useState } from 'react';
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
import Select from '../../../components/Select';

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
  cep: string;
  state: string;
  city: string;
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

const ConstructionForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [locationData, setLocationData] = useState<LocationData>({
    city: '',
    state: 'AC',
  });

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
    async (data: ConstructionFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          construction: Yup.string().required(
            'O campo construção é obrigatório',
          ),
          address: Yup.string(),
          start_date: Yup.date(),
          state: Yup.string(),
          city: Yup.string(),
          cep: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await create({
          construction: data.construction,
          address: data.address,
          startDate: data.start_date,
          state: data.state,
          cep: data.cep,
          city: data.city,
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
      <Card animationDirection="left" hasAnimation height="50vh">
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
