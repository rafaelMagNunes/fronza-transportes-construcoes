import React, { useState, useEffect, useCallback } from 'react';
import { cnpj as CNPJ } from 'cpf-cnpj-validator';
import { FiEdit, FiTrash2, FiCheckCircle } from 'react-icons/fi';

import api from '../../services/api';

import history from '../../services/history';

import { useSupplier } from '../../hooks/supplier';

import Pagination from '../Pagination';

import { Container } from './styles';
import Supplier from '../../pages/Supplier';

interface ColumnsProps {
  column: string;
  title: string;
}

interface Supplier {
  id: string;
  name: string;
  phone: string;
  cnpj: string;
  cep: string;
  state: string;
  city: string;
  address: string;
  email: string;
}

const columns = [
  {
    column: 'name',
    title: 'Fornecedor',
  },
  {
    column: 'cnpj',
    title: 'CNPJ/CPF',
  },
  {
    column: 'email',
    title: 'E-mail',
  },
  {
    column: 'state',
    title: 'Estado',
  },
  {
    column: 'city',
    title: 'Cidade',
  },
  {
    column: 'address',
    title: 'Endereço',
  },
  {
    column: 'phone',
    title: 'Telefone',
  },
  {
    column: 'actions',
    title: 'Ações',
  },
];

const Table: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [supplierList, setSupplierList] = useState<Supplier[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [supplierId, setSupplierId] = useState<string>('');

  const { storeSupplier, remove } = useSupplier();

  useEffect(() => {
    async function loadSuppliers(): Promise<void> {
      const response = await api.get<Supplier[]>('/suppliers', {
        params: {
          page,
          limit: 7,
        },
      });

      setSuppliers(response.data);
    }

    loadSuppliers();
  }, [setSuppliers, page]);

  const handleEdit = useCallback(
    supplier => {
      storeSupplier(supplier);
      history.push('/supplieredit');
    },
    [storeSupplier],
  );

  function addPage(): void {
    setPage(page + 1);
  }

  function subPage(): void {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handleDelete = useCallback(
    id => {
      setIsChecked(true);
      setSupplierId(id);
    },
    [setIsChecked, setSupplierId],
  );

  const handleSearch = useCallback(
    async event => {
      setSupplierList(suppliers);

      const response = await api.get<Supplier[]>(
        `suppliers/search/${event.target.value}`,
      );

      const { data } = response;

      if (data.length === 0) {
        setSuppliers(supplierList);
      } else {
        setSuppliers(data);
      }
    },
    [setSuppliers, setSupplierList, supplierList, suppliers],
  );

  const handleConfirmDelete = useCallback(async () => {
    await remove(supplierId);
  }, [remove, supplierId]);

  return (
    <Container hasAnimation>
      <input placeholder="Pesquisar ..." onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th>{column.title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {suppliers.map(supplier => (
            <tr>
              <td className="title">{supplier.name}</td>
              <td>{CNPJ.format(supplier.cnpj)}</td>
              <td>{supplier.email}</td>
              <td>{supplier.state}</td>
              <td>{supplier.city}</td>
              <td>{supplier.address}</td>
              <td>{supplier.phone}</td>
              <td>
                <FiEdit
                  onClick={() => handleEdit(supplier)}
                  className="edit"
                  size={25}
                />
                {isChecked && supplierId === supplier.id ? (
                  <FiCheckCircle
                    onClick={handleConfirmDelete}
                    className="remove"
                    size={25}
                  />
                ) : (
                  <FiTrash2
                    onClick={() => handleDelete(supplier.id)}
                    className="remove"
                    size={25}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination addPage={addPage} subPage={subPage} page={page} />
    </Container>
  );
};

export default Table;
