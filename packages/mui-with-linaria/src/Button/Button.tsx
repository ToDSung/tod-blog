import { css } from '@linaria/core';
import { Button as MuiButton, type ButtonProps } from '@mui/material';

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export type CustomButtonProps = ButtonProps;

export const Button = ({ children, ...props }: CustomButtonProps) => {
  return (
    <div className={buttonWrapper}>
      <label>Button Label</label>
      <MuiButton {...props}>{children}</MuiButton>
    </div>
  );
};
