import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";
import { Navigate, useNavigate } from "react-router";

const RouteButton = ({ title, to, ...props }) => {
  const route = useNavigate();

  // Use a default value if 'to' is undefined
  const target = to || "/"; // You can change '/' to a default route

  return (
    <Button {...props} onClick={() => route(to)}>
      {title}
    </Button>
  );
};

export default RouteButton;
