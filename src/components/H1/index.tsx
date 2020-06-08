import React from 'react';
import { IconBaseProps } from 'react-icons';

import { H1Style } from './styles';

interface H1Props {
  color?: string;
  iconColor?: string;
  hasIcon?: boolean;
  fontSize?: string;
  icon?: React.ComponentType<IconBaseProps>;
  hasAnimation?: boolean;
}

const H1: React.FC<H1Props> = ({
  children,
  color,
  icon: Icon,
  fontSize,
  iconColor,
  hasAnimation = false,
}) => {
  return (
    <H1Style
      hasAnimation={hasAnimation}
      iconColor={iconColor}
      fontSize={fontSize}
      color={color}
    >
      {Icon && <Icon />}
      {children}
    </H1Style>
  );
};

export default H1;
