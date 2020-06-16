import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import H1 from '../../components/H1';
import Header from '../../components/Header';
import ConstructionsCard from '../../components/ConstructionsCard';

import { Container, Grid, Body } from './styles';

interface Constructions {
  id: string;
  construction: string;
  start_date: string;
  address: string;
}

const Home: React.FC = () => {
  const [constructions, setConstructions] = useState<Constructions[]>([]);

  useEffect(() => {
    async function loadConstructions(): Promise<void> {
      const response = await api.get<Constructions[]>('/constructions', {
        params: {
          page: 1,
          limit: 6,
          details: false,
        },
      });

      setConstructions(response.data);
    }

    loadConstructions();
  }, [setConstructions]);

  return (
    <Container>
      <Header>
        <H1
          hasAnimation
          iconColor="#666ffa"
          color="rgba(0, 0, 200, 0.30)"
          fontSize="40px"
        >
          Início
        </H1>
      </Header>

      <Body>
        <Grid>
          {constructions.map(construction => (
            <ConstructionsCard construction={construction} />
          ))}
        </Grid>
      </Body>
    </Container>
  );
};

export default Home;
