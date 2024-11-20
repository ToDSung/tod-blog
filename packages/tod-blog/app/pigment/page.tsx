import MuiSwitch from '@mui/material/Switch';
import { css } from '@pigment-css/react';

const switchStyle = css`
  &.MuiSwitch-root {
    background-color: red;

    & > .Mui-checked {
      color: green;
    }
  }
`;

const Page = () => {
  return (
    <div>
      <MuiSwitch className={switchStyle} />
    </div>
  );
};

export default Page;
