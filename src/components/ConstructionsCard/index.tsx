import React, { useCallback } from 'react';
import { FiHome, FiEye } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';

import { useConstruction } from '../../hooks/construction';

import history from '../../services/history';

import { Container } from './styles';

interface Construction {
  id: string;
  construction: string;
  start_date: string;
  city: string;
  state: string;
  address: string;
  cep: string;
}

interface ConstructionData {
  id: string;
  construction: string;
  start_date: Date;
  city: string;
  state: string;
  address: string;
  cep: string;
}

interface ConstructionCardProps {
  construction: Construction;
}

const ConstructionsCard: React.FC<ConstructionCardProps> = ({
  construction,
}) => {
  const { store } = useConstruction();

  const handleSelectConstructionToEdit = useCallback(() => {
    store(construction.id);
    history.push('/constructionsdeatail');
  }, [store, construction.id]);

  return (
    <Container>
      <FiHome size={25} color="#3743fa" />
      <h1>{construction.construction}</h1>
      <p className="address">{construction.address}</p>
      <aside>
        <p className="column">Estado:</p>
        <p>{construction.state}</p>
      </aside>
      <aside>
        <p className="column">Cidade:</p>
        <p>{construction.city}</p>
      </aside>
      <aside>
        <p className="column">Data de Início:</p>
        <p>{format(parseISO(construction.start_date), 'dd/MM/yyyy')}</p>
      </aside>
      <footer>
        <FiEye
          onClick={handleSelectConstructionToEdit}
          size={20}
          color="#3743fa"
        />
      </footer>
    </Container>
  );
};

export default ConstructionsCard;
