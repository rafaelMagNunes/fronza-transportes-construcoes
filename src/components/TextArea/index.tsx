import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  iconSize?: number;
  padding?: string;
  width?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  icon: Icon,
  iconSize = 20,
  padding = '16px',
  width,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsField(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      width={width}
      padding={padding}
      isErrored={!!error}
      isField={isField}
      isFocused={isFocused}
    >
      {Icon && <Icon size={iconSize} />}
      <textarea
        rows={2}
        cols={2}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error hasArrow title={error}>
          <FiAlertCircle color="#ff7772" size={iconSize} />
        </Error>
      )}
    </Container>
  );
};

export default TextArea;
