'use client';

import { Button } from '@mui/material';
import Link from 'next/link';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';

import type { ReactNode } from 'react';

import baseStore from './redux-example/store/baseStore';
import { UserStoreProvider } from './zustand-example/store/userStoreProvider';

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
          <Link href='/state-management/zustand-example/react'>
            <Button variant='contained'>zustand react</Button>
          </Link>
          <Link href='/state-management/zustand-example/vanilla'>
            <Button variant='contained'>zustand vanilla</Button>
          </Link>
          <Link href='/state-management/all-user-name'>
            <Button variant='contained'>all user name</Button>
          </Link>
        </div>
        <UserStoreProvider>
          <RecoilRoot>
            <Provider store={baseStore}>{children}</Provider>
          </RecoilRoot>
        </UserStoreProvider>
      </div>
    </>
  );
};

export default StateManagementLayout;
