/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import { FiTrash2, FiCheckCircle } from 'react-icons/fi';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import api from '../../services/api';

import { useConstruction } from '../../hooks/construction';
import { useIten } from '../../hooks/iten';
import { useToast } from '../../hooks/toast';

import formatValue from '../../utils/formatValue';

import { Container, Dialog } from './styles';

interface Supplier {
  name: string;
  phone: string;
  cnpj: string;
  cep: string;
  state: string;
  city: string;
  address: string;
  email: string;
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
  time: string;
  data: Iten[] | undefined;
}

const columns = [
  {
    title: 'Descrição',
  },
  {
    title: 'Data',
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

const ConstructionDetailTable: React.FC<TableProps> = ({ data, time }) => {
  const [constructions, setConstructions] = useState<Constructions>();
  const [itens, setItens] = useState<Iten[] | undefined>([]);
  const [supplier, setSupplier] = useState<Supplier>();
  const [itenId, setItenId] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

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
          },
        },
      );

      setConstructions(response.data);
    }

    setItens(data);

    loadConstructions();
  }, [setConstructions, id, data, setItens]);

  const handleClose = useCallback(
    suppliers => {
      setSupplier(suppliers);
      setOpen(!open);
    },
    [open, setOpen, setSupplier],
  );

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

        {time === 'all' ? (
          <tbody>
            {constructions?.iten.map(iten => (
              <tr>
                <td className="title">{iten.description}</td>
                <td>{format(parseISO(iten.date), 'dd/MM/yyyy')}</td>
                <td className="supplier">
                  <p onClick={() => handleClose(iten.supplier)}>
                    {iten.supplier.name}
                  </p>
                </td>
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
        ) : (
          <tbody>
            {itens ? (
              itens.map(iten => (
                <tr>
                  <td className="title">{iten.description}</td>
                  <td>{format(parseISO(iten.date), 'dd/MM/yyyy')}</td>
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
              ))
            ) : (
              <></>
            )}
          </tbody>
        )}
      </table>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {supplier ? (
          <>
            <DialogTitle id="alert-dialog-title">{supplier.name}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div>
                  <h4>CPF/CNPJ:</h4>
                  <p>
                    {cpf.isValid(supplier.cnpj, true)
                      ? cpf.format(supplier.cnpj)
                      : cnpj.format(supplier.cnpj)}
                  </p>
                </div>
                <div>
                  <h4>CEP:</h4>
                  <p>{supplier.cep}</p>
                </div>
                <div>
                  <h4>Estado:</h4>
                  <p>{supplier.state}</p>
                </div>
                <div>
                  <h4>Cidade:</h4>
                  <p>{supplier.city}</p>
                </div>
                <div>
                  <h4>Endereço:</h4>
                  <p>{supplier.address}</p>
                </div>
                <div>
                  <h4>Telefone:</h4>
                  <p>{supplier.phone}</p>
                </div>
                <div>
                  <h4>E-mail:</h4>
                  <p>{supplier.email}</p>
                </div>
              </DialogContentText>
            </DialogContent>
          </>
        ) : (
          <></>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConstructionDetailTable;
