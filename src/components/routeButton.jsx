import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';
import { FaSquarePlus } from 'react-icons/fa6';
import { Navigate, useNavigate } from 'react-router';

const RouteButton = ({
  title,
  to,
  bg,
  bgHover,
  variant,
  lefticon,
  ...props
}) => {
  const navigate = useNavigate();

  // Use a default value if 'to' is undefined
  const target = to || '/'; // You can change '/' to a default navigate

  return (
    <Button
      onClick={() => navigate(to)}
      {...props}
      variant={variant || 'solid'}
      backgroundColor={bg || '#1B62D6'}
      _hover={{ backgroundColor: bgHover || '#3B82F6' }}
      leftIcon={lefticon}
    >
      {title}
    </Button>
  );
};

export default RouteButton;
