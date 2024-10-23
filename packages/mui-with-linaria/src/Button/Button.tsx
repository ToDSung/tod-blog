import { Button as MuiButton, ButtonProps } from '@mui/material';

export interface CustomButtonProps extends ButtonProps {}

export const Button = ({ children, ...props }: CustomButtonProps) => {
  return (
    <div>
      <label>I am Button Label</label>
      <MuiButton {...props}>{children}</MuiButton>
    </div>
  );
};
