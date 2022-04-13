import { FC } from 'react';

type Props = {
  color?: string;
};

const Progress: FC<Props> = () => {
  return (
    <div className='propgress flex h-screen w-screen items-center justify-center '>
      <div
        className={`spinner spinner--max h-12 w-12 animate-[spin_3s_linear_infinite] border-fountain-blue`}
      >
        <div
          className={`spinner spinner--mid h-10 w-10 animate-[spin_5s_linear_infinite] border-fountain-blue`}
        >
          <div
            className={`spinner spinner--min h-8 w-8 animate-[spin_5s_linear_infinite] border-fountain-blue`}
          />
        </div>
      </div>
    </div>
  );
};

export default Progress;
