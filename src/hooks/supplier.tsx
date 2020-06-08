import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface SupplierData {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
}

interface UpdateSupplier {
  id: string;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
}

interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
}

interface SupplierState {
  id: string;
}

interface SupplierDataState {
  supplier: Supplier;
}

interface SupplierContextData {
  id: string;
  supplier: Supplier;
  create({ name, email, cnpj, phone }: SupplierData): Promise<void>;
  update({ id, name, email, cnpj, phone }: UpdateSupplier): Promise<void>;
  remove(id: string): Promise<string>;
  store(id: string): void;
  storeSupplier(supplier: Supplier): void;
}

const SupplierContext = createContext<SupplierContextData>(
  {} as SupplierContextData,
);

export const SupplierProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<SupplierState>(() => {
    const id = localStorage.getItem('@FronzaTransportes:supplier_id');

    if (id) {
      return { id };
    }

    return {} as SupplierState;
  });

  const [dataSupplier, setDataSupplier] = useState<SupplierDataState>(() => {
    const supplier = localStorage.getItem('@FronzaTransportes:supplier');

    if (supplier) {
      return { supplier: JSON.parse(supplier) };
    }

    return {} as SupplierDataState;
  });

  const store = useCallback(async id => {
    localStorage.setItem('@FronzaTransportes:supplier_id', id);
    setData({ id });
  }, []);

  const storeSupplier = useCallback(async supplier => {
    localStorage.setItem(
      '@FronzaTransportes:supplier',
      JSON.stringify(supplier),
    );

    setDataSupplier({ supplier });
  }, []);

  const create = useCallback(async ({ name, phone, email, cnpj }) => {
    await api.post('/suppliers', {
      name,
      phone,
      email,
      cnpj,
    });
  }, []);

  const update = useCallback(async ({ id, name, phone, email, cnpj }) => {
    await api.put(`/suppliers/${id}`, {
      name,
      phone,
      email,
      cnpj,
    });
  }, []);

  const remove = useCallback(async id => {
    const response = await api.delete(`/constructions/${id}`);

    return response.data;
  }, []);

  return (
    <SupplierContext.Provider
      value={{
        id: data.id,
        supplier: dataSupplier.supplier,
        create,
        update,
        remove,
        store,
        storeSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export function useSupplier(): SupplierContextData {
  const context = useContext(SupplierContext);

  if (!context) {
    throw new Error('useSupplier must be used within an ContextProvider');
  }

  return context;
}
