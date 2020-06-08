import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import Pagination from '../Pagination';

import { Container } from './styles';

interface ColumnsProps {
  column: string;
  title: string;
}

interface DataProps {
  description: string;
  payment_type: string;
  value: number;
  self_life_date: string;
  date: string;
}

interface TableProps {
  data: DataProps[];
  columns: ColumnsProps[];
  hasAnimation?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  hasAnimation = false,
}) => {
  const [page, setPage] = useState<number>(1);

  function addPage(): void {
    setPage(page + 1);
  }

  function subPage(): void {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <Container hasAnimation={hasAnimation}>
      <input placeholder="Pesquisar ..." />
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th>{column.title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map(iten => (
            <tr>
              <td className="title">{iten.description}</td>
              <td>{iten.date}</td>
              <td>{iten.value}</td>
              <td>{iten.payment_type}</td>
              <td>{iten.self_life_date}</td>
              <td>
                <FiEdit className="edit" size={25} />
                <FiTrash2 className="remove" size={25} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination addPage={addPage} page={page} subPage={subPage} />
    </Container>
  );
};

export default Table;
