import React from 'react';

import { Container } from './styles';

interface CardProps {
  width?: string;
  height?: string;
  hasAnimation?: boolean;
  animationDirection?: 'left' | 'right';
  boxShadow?: '1' | '2' | '3';
  margingTop?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  width,
  height,
  hasAnimation,
  animationDirection,
  boxShadow,
  margingTop,
}) => {
  return (
    <Container
      margingTop={margingTop}
      width={width}
      height={height}
      hasAnimation={hasAnimation}
      animationDirection={animationDirection}
      boxShadow={boxShadow}
    >
      {children}
    </Container>
  );
};

export default Card;
