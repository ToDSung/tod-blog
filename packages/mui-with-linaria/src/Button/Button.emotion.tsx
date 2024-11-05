import { css } from '@emotion/react';
import MuiButton, { type ButtonProps } from '@mui/material/Button';

import { BaseColors } from '../theme/color.type';

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const button = css`
  & {
    background-color: ${BaseColors.GREEN_7};
  }
`;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <div css={buttonWrapper}>
      <label>Emotion Button Label</label>
      <MuiButton {...props} css={button}>
        {children}
      </MuiButton>
    </div>
  );
};

export default Button;
