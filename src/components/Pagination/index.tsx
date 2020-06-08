import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Container } from './styles';

interface PaginationProps {
  addPage(): void;
  subPage(): void;
  page: number;
}

const Pagination: React.FC<PaginationProps> = ({ addPage, subPage, page }) => {
  return (
    <Container>
      <FiChevronLeft onClick={subPage} className="left" size={30} />
      <p>{page}</p>
      <FiChevronRight onClick={addPage} className="right" size={30} />
    </Container>
  );
};

export default Pagination;
