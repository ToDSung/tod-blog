import { css } from '@linaria/core';
import MuiButton, { type ButtonProps } from '@mui/material/Button';

import { BaseColors } from '../theme/color.type';

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const button = css`
  &.MuiButton-root {
    /* background-color: ${BaseColors.GREEN_7}; */
  }
`;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <div className={buttonWrapper}>
      {/* <label>Linaria Button Label</label> */}
      <MuiButton {...props} className={button}>
        {children}
      </MuiButton>
    </div>
  );
};

export default Button;
