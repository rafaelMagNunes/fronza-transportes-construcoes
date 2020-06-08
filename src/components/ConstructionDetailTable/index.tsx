import React, { useEffect, useState, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import { FiTrash2, FiCheckCircle } from 'react-icons/fi';

import api from '../../services/api';

import { useConstruction } from '../../hooks/construction';
import { useIten } from '../../hooks/iten';
import { useToast } from '../../hooks/toast';

import formatValue from '../../utils/formatValue';

import { Container } from './styles';

interface Supplier {
  name: string;
}

interface Iten {
  id: string;
  description: string;
  payment_type: string;
  value: number;
  self_life_date: string;
  date: string;
  supplier: Supplier;
}

interface Constructions {
  construction: string;
  start_date: string;
  address: string;
  iten: Iten[];
}

interface TableProps {
  startDate: Date;
  endDate: Date;
}

const columns = [
  {
    title: 'Data',
  },
  {
    title: 'Descrição',
  },
  {
    title: 'Fornecedor',
  },
  {
    title: 'Valor',
  },
  {
    title: 'Vencimento',
  },
  {
    title: 'Pagamento',
  },
  {
    title: 'Ações',
  },
];

const ConstructionDetailTable: React.FC<TableProps> = ({
  startDate,
  endDate,
}) => {
  const [constructions, setConstructions] = useState<Constructions>();
  const [itenId, setItenId] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { id } = useConstruction();
  const { remove } = useIten();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadConstructions(): Promise<void> {
      const response = await api.get<Constructions>(
        `/constructions/byid/${id}`,
        {
          params: {
            details: 'true',
            start_date: startDate.toString(),
            end_date: endDate.toString(),
          },
        },
      );

      setConstructions(response.data);
    }

    loadConstructions();
  }, [setConstructions, id, startDate, endDate]);

  const handleSetConfirm = useCallback(
    id => {
      setItenId(id);
      setIsChecked(true);
    },
    [setItenId, setIsChecked],
  );

  const handleDelete = useCallback(async () => {
    try {
      await remove(itenId);

      window.location.reload();

      addToast({
        type: 'success',
        title: 'Produto ou serviço deletado com sucesso',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar produto ou serviço',
      });
    }
  }, [addToast, itenId, remove]);

  return (
    <Container hasAnimation>
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th>{column.title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {constructions?.iten.map(iten => (
            <tr>
              <td className="title">
                {format(parseISO(iten.date), 'dd/MM/yyyy')}
              </td>
              <td>{iten.description}</td>
              <td>{iten.supplier.name}</td>
              <td>{formatValue(iten.value)}</td>
              <td>
                {iten.payment_type !== 'à vista'
                  ? format(parseISO(iten?.self_life_date), 'dd/MM/yyyy')
                  : 'à vista'}
              </td>
              <td>{iten.payment_type}</td>
              <td>
                {isChecked && iten.id === itenId ? (
                  <FiCheckCircle
                    onClick={handleDelete}
                    size={25}
                    color="#ff5f59"
                  />
                ) : (
                  <FiTrash2
                    onClick={() => handleSetConfirm(iten.id)}
                    size={25}
                    color="#ff5f59"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default ConstructionDetailTable;
