'use client';
import React, {
  CSSProperties,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Select,
  SelectProps,
} from '@chakra-ui/react';

const CustomSelect = ({
  id,
  title,
  errorMessage,
  style,
  values,
  handleChange,
  handleBlur,
  isInvalid,
  backgroundColor,
  hoverStyles,
  children,
  ...props
}) => {
  return (
    <>
      <FormControl isInvalid={isInvalid}>
        <FormLabel
          cursor={'pointer'}
          style={{ width: 'fit-content' }}
          color={backgroundColor || '#262A56'}
          htmlFor={id}
          fontWeight=""
        >
          {title}
        </FormLabel>
        <Select
          style={style}
          id={id}
          value={values}
          onBlur={handleBlur}
          onChange={handleChange}
          color={'#000000'}
          backgroundColor={backgroundColor || '#262A56'}
          _hover={hoverStyles || { backgroundColor: '#ffffff' }}
          variant="filled"
          placeholder={`Masukkan ${title}`}
          {...props}
        >
          {children}
        </Select>

        <FormErrorMessage size={'xs'} color={'red'} fontWeight="">
          {errorMessage}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default CustomSelect;
