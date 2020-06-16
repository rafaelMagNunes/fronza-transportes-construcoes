import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface CostructionData {
  construction: string;
  address: string;
  startDate: string;
  cep: string;
  state: string;
  city: string;
}

interface UpdateCostruction {
  id: string;
  construction: string;
  address: string;
  start_date: string;
  cep: string;
  state: string;
  city: string;
}

interface Costruction {
  id: string;
  construction: string;
  address: string;
  start_date: Date;
  cep: string;
  state: string;
  city: string;
}

interface ConstructionState {
  id: string;
}

interface ConstructionDataState {
  construction: Costruction;
}

interface ConstructionContextData {
  id: string;
  construction: Costruction;
  create({
    construction,
    address,
    startDate,
    state,
    cep,
    city,
  }: CostructionData): Promise<void>;
  update({
    id,
    construction,
    address,
    start_date,
    state,
    cep,
    city,
  }: UpdateCostruction): Promise<void>;
  remove(id: string): Promise<string>;
  store(id: string): void;
  storeConstruction(construction: Costruction): void;
}

const ConstructionContext = createContext<ConstructionContextData>(
  {} as ConstructionContextData,
);

export const ConstructionProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ConstructionState>(() => {
    const id = localStorage.getItem('@FronzaTransportes:construction_id');

    if (id) {
      return { id };
    }

    return {} as ConstructionState;
  });

  const [dataConstruction, setDataConstruction] = useState<
    ConstructionDataState
  >(() => {
    const construction = localStorage.getItem(
      '@FronzaTransportes:construction',
    );

    if (construction) {
      return { construction: JSON.parse(construction) };
    }

    return {} as ConstructionDataState;
  });

  const store = useCallback(async id => {
    localStorage.setItem('@FronzaTransportes:construction_id', id);
    setData({ id });
  }, []);

  const storeConstruction = useCallback(async construction => {
    localStorage.setItem(
      '@FronzaTransportes:construction',
      JSON.stringify(construction),
    );

    setDataConstruction({ construction });
  }, []);

  const create = useCallback(
    async ({ construction, address, startDate, cep, state, city }) => {
      await api.post('/constructions', {
        construction,
        address,
        start_date: startDate,
        cep,
        state,
        city,
      });
    },
    [],
  );

  const update = useCallback(
    async ({ id, construction, address, start_date, state, cep, city }) => {
      await api.put(`/constructions/${id}`, {
        construction,
        address,
        start_date,
        state,
        cep,
        city,
      });
    },
    [],
  );

  const remove = useCallback(async id => {
    const response = await api.delete(`/constructions/${id}`);

    return response.data;
  }, []);

  return (
    <ConstructionContext.Provider
      value={{
        id: data.id,
        construction: dataConstruction.construction,
        create,
        update,
        remove,
        store,
        storeConstruction,
      }}
    >
      {children}
    </ConstructionContext.Provider>
  );
};

export function useConstruction(): ConstructionContextData {
  const context = useContext(ConstructionContext);

  if (!context) {
    throw new Error('useConstruction must be used within an ContextProvider');
  }

  return context;
}
