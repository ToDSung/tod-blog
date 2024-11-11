import { css } from '@linaria/core';
import MuiButton, {
  type ButtonProps as MuiButtonProps,
} from '@mui/material/Button';
import { useId } from 'react';

import { BaseColors } from '../theme/color.type';

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const button = css`
  &.MuiButton-root {
    background-color: ${BaseColors.GREEN_7};
  }
`;

export interface ButtonProps extends MuiButtonProps {
  label?: string;
}

const Button = ({ label, children, ...props }: ButtonProps) => {
  const id = useId();

  return (
    <div className={buttonWrapper}>
      {label && <label id={id}>{label}</label>}
      <MuiButton {...props} aria-labelledby={id} className={button}>
        {children}
      </MuiButton>
    </div>
  );
};

export default Button;
