'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';

import type { ReactNode } from 'react';

import baseStore from './redux-example/store/baseStore';

interface StateManagementLayoutProps {
  children: ReactNode;
}

const StateManagementLayout = ({ children }: StateManagementLayoutProps) => {
  return (
    <>
      <div>
        <div className='mt-4 flex gap-4'>
          <Link href='/state-management/jotai-example'>
            <Button variant='contained'>jotai</Button>
          </Link>
          <Link href='/state-management/recoil-example'>
            <Button variant='contained'>recoil</Button>
          </Link>
          <Link href='/state-management/redux-example'>
            <Button variant='contained'>redux</Button>
          </Link>
          <Link href='/state-management/zustand-example'>
            <Button variant='contained'>zustand</Button>
          </Link>
          <Link href='/state-management/zustand-example'>
            <Button variant='contained'>zustand2</Button>
          </Link>
        </div>
        <RecoilRoot>
          <Provider store={baseStore}>{children}</Provider>
        </RecoilRoot>
      </div>
    </>
  );
};

export default StateManagementLayout;
