import React, { createContext, useCallback, useContext } from 'react';

import api from '../services/api';

interface ItenData {
  date: string;
  description: string;
  supplier_id: string;
  payment_type: string;
  self_life_date: string | null;
  value: number;
  construction_id: string;
}

interface Iten {
  date: Date;
  description: string;
  supplier_id: string;
  payment_type: string;
  self_life_date: Date;
  value: number;
  construction_id: string;
}

interface ItenContextData {
  create({
    date,
    description,
    supplier_id,
    payment_type,
    self_life_date,
    value,
    construction_id,
  }: ItenData): Promise<void>;
  remove(id: string): Promise<string>;
}

const ItenContext = createContext<ItenContextData>({} as ItenContextData);

export const ItenProvider: React.FC = ({ children }) => {
  const create = useCallback(
    async ({
      date,
      description,
      supplier_id,
      payment_type,
      self_life_date,
      value,
      construction_id,
    }) => {
      await api.post(`/itens/${construction_id}`, {
        date,
        description,
        supplier_id,
        payment_type,
        self_life_date,
        value,
      });
    },
    [],
  );

  const remove = useCallback(async id => {
    const response = await api.delete(`/itens/${id}`);

    return response.data;
  }, []);

  return (
    <ItenContext.Provider
      value={{
        create,
        remove,
      }}
    >
      {children}
    </ItenContext.Provider>
  );
};

export function useIten(): ItenContextData {
  const context = useContext(ItenContext);

  if (!context) {
    throw new Error('useIten must be used within an ContextProvider');
  }

  return context;
}
