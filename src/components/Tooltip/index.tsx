import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
  alignProp?: 'top' | 'left' | 'bottom' | 'right';
  hasArrow?: boolean;
  widthProp?: string;
  left?: string;
  right?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
  alignProp,
  hasArrow = false,
  widthProp = '160px',
  left,
  right,
}) => {
  return (
    <Container
      widthProp={widthProp}
      hasArrow={hasArrow}
      alignProp={alignProp}
      className={className}
      left={left}
      right={right}
    >
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
