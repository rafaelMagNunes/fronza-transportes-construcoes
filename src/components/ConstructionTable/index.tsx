/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { FiEdit, FiTrash2, FiEye, FiCheckCircle } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';
import history from '../../services/history';

import { useConstruction } from '../../hooks/construction';
import { useToast } from '../../hooks/toast';

import Pagination from '../Pagination';

import { Container } from './styles';

interface Constructions {
  id: string;
  construction: string;
  start_date: string;
  address: string;
  cep: string;
  state: string;
  city: string;
}

interface Construction {
  id: string;
  construction: string;
  start_date: Date;
  address: string;
  cep: string;
  state: string;
  city: string;
}

const columns = [
  {
    column: 'construction',
    title: 'Obra',
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
    column: 'start_date',
    title: 'Data Início',
  },
  {
    column: 'actions',
    title: 'Ações',
  },
];

const Table: React.FC = () => {
  const [constructions, setConstructions] = useState<Constructions[]>([]);
  const [constructionList, setConstructionList] = useState<Constructions[]>([]);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { store, storeConstruction, remove } = useConstruction();
  const { addToast } = useToast();

  function addPage(): void {
    setPage(page + 1);
  }

  function subPage(): void {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    async function loadConstructions(): Promise<void> {
      const response = await api.get<Constructions[]>('/constructions', {
        params: {
          page,
          limit: 7,
          details: false,
        },
      });

      setConstructions(response.data);
    }

    loadConstructions();
  }, [setConstructions, page]);

  const handleSelectConstructionToSeeDetails = useCallback(
    id => {
      store(id);
      history.push('/constructionsdeatail');
    },
    [store],
  );

  const handleSelectConstructionToEdit = useCallback(
    construction => {
      const constructionObject: Construction = {
        id: construction.id,
        construction: construction.construction,
        address: construction.address,
        start_date: new Date(construction.start_date),
        state: construction.state,
        cep: construction.cep,
        city: construction.city,
      };

      storeConstruction(constructionObject);
      history.push('/constructionedit');
    },
    [storeConstruction],
  );

  const handleConfirm = useCallback(async () => {
    try {
      await remove(id);

      addToast({
        type: 'success',
        title: 'Obra deletada com sucesso',
      });

      setIsConfirmed(false);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar obra',
      });
    }
  }, [addToast, remove, id]);

  const handleDeleteConstruction = useCallback(
    id => {
      setId(id);
      setIsConfirmed(true);
    },
    [setId, setIsConfirmed],
  );

  const handleSearch = useCallback(
    async event => {
      setConstructionList(constructions);

      const response = await api.get<Constructions[]>(
        `constructions/search/${event.target.value}`,
      );

      const { data } = response;

      if (data.length === 0) {
        setConstructions(constructionList);
      } else {
        setConstructions(data);
      }
    },
    [setConstructions, setConstructionList, constructionList, constructions],
  );

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
          {constructions.map(iten => (
            <tr>
              <td className="title">{iten.construction}</td>
              <td className="title">{iten.state}</td>
              <td className="title">{iten.city}</td>
              <td>{iten.address}</td>
              <td>{format(parseISO(iten.start_date), 'dd/MM/yyyy')}</td>
              <td>
                <FiEye
                  onClick={() => handleSelectConstructionToSeeDetails(iten.id)}
                  className="see"
                  size={25}
                />
                <FiEdit
                  onClick={() => handleSelectConstructionToEdit(iten)}
                  className="edit"
                  size={25}
                />
                {isConfirmed && id === iten.id ? (
                  <FiCheckCircle
                    onClick={handleConfirm}
                    className="remove"
                    size={25}
                  />
                ) : (
                  <FiTrash2
                    onClick={() => handleDeleteConstruction(iten.id)}
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
