import { Button as MuiButton } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import type { LinkProps } from "react-router-dom";
import { forwardRef } from "react";

// Suporte para prop 'to' quando 'component={Link}'
type CustomButtonProps = ButtonProps & Partial<LinkProps>;

const Button = forwardRef<HTMLButtonElement, CustomButtonProps>((props, ref) => {
  return <MuiButton ref={ref} {...props} />;
});

export default Button;