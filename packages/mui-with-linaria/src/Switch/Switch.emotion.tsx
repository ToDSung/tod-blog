import { css } from '@emotion/react';
import MuiSwitch, {
  type SwitchProps as MuiSwitchProps,
} from '@mui/material/Switch';

import type { ReactNode } from 'react';

import { BaseColors } from '../theme/color.type';

const switchWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const switchStyle = css`
  &.MuiSwitch-root {
    background-color: ${BaseColors.GREY_700};

    & > .Mui-checked {
      color: ${BaseColors.GREEN_5};
    }

    & > .Mui-disabled {
      color: transparent;
      color: ${BaseColors.GREY_700};
    }
  }
`;

export type SwitchProps = MuiSwitchProps & {
  children: ReactNode;
};

const Switch = ({ children, ...props }: SwitchProps) => {
  return (
    <div css={switchWrapperStyle}>
      <MuiSwitch {...props} css={switchStyle} />
      <label>{children}</label>
    </div>
  );
};

export default Switch;
