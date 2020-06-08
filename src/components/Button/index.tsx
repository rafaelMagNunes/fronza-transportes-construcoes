import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'addButton' | 'normal';
}

const Button: React.FC<ButtonProps> = ({
  children,
  buttonType = 'normal',
  ...rest
}) => (
  <Container buttonType={buttonType} type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
