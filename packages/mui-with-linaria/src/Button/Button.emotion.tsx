import { css } from '@emotion/css';
import MuiButton, { type ButtonProps } from '@mui/material/Button';

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const button = css`
  background-color: red;
`;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <div className={buttonWrapper}>
      <label>Emotion Button Label</label>
      <MuiButton {...props} className={button}>
        {children}
      </MuiButton>
    </div>
  );
};

export default Button;
