"use client";
import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";

const CustomInput = ({
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
  type,
  className,
  ...props
}) => {
  return (
    <>
      <FormControl isInvalid={isInvalid}>
        <FormLabel
          cursor={"pointer"}
          style={{ width: "fit-content" }}
          color={backgroundColor || "#262A56"}
          htmlFor={id}
          fontWeight=""
        >
          {title}
        </FormLabel>
        <InputGroup size="lg">
          <Input
            className={className}
            style={style}
            as="input"
            type={type || "text"}
            id={id}
            value={values}
            onChange={handleChange}
            onBlur={handleBlur}
            color={"#000000"}
            backgroundColor={backgroundColor || "#262A56"} // Use the provided backgroundColor or a default value
            _hover={hoverStyles || { backgroundColor: "#ffffff" }}
            variant="filled"
            placeholder={`Masukkan ${title}`}
            {...props}
          />
        </InputGroup>

        <FormErrorMessage size={"xs"} color={"red"} fontWeight="">
          {errorMessage}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default CustomInput;
