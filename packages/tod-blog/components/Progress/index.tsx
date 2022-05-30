import { FC } from 'react';

import { Transition } from '@headlessui/react';

import useLoading from '@/contexts/loading';

const Circle = () => (
  <div
    className={`spinner spinner--max absolute h-12 w-12 animate-[spin_3s_linear_infinite] border-fountain-blue`}
  >
    <div
      className={`spinner spinner--mid h-10 w-10 animate-[spin_5s_linear_infinite] border-fountain-blue`}
    >
      <div
        className={`spinner spinner--min h-8 w-8 animate-[spin_5s_linear_infinite] border-fountain-blue`}
      />
    </div>
  </div>
);

const Progress = () => {
  const { loading } = useLoading();
  return (
    <Transition show={loading} leave='duration-1000'>
      <div className='propgress absolute z-50 flex h-screen w-[99vw] items-center justify-center bg-white overflow-x-hidden	'>
        <Transition
          show={loading}
          leave='transition-all duration-1000'
          leaveFrom='opacity-100'
          leaveTo='translate-x-28 translate-y-28 opacity-0'
        >
          <Circle />
        </Transition>
        <Transition
          show={loading}
          leave='transition-all duration-1000'
          leaveFrom='translate-y-0 opacity-100'
          leaveTo='-translate-x-28 -translate-y-28 opacity-0'
        >
          <Circle />
        </Transition>
      </div>
    </Transition>
  );
};

export default Progress;
