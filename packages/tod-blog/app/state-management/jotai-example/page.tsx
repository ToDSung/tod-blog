'use client';

import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';

import type { ChangeEvent } from 'react';

import Typography from '@/components/Typography';

import CounterControl from '../component/CounterControl';
import CounterResult from '../component/CounterResult';
import UserEmailTemplate from '../component/UserEmailTemplate';
import UserFormControl from '../component/UserFormControl';

import { countAtom } from './atoms/counterAtom';
import { userAtom, userEmailAtom } from './atoms/userAtom';
import UserName from './UserName';

const UserForm = () => {
  const [user, setUser] = useAtom(userAtom);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(prev => ({ ...prev, name: e.target.value }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(prev => ({ ...prev, email: e.target.value }));
  };

  return (
    <UserFormControl
      name={user.name}
      email={user.email}
      onNameChange={handleNameChange}
      onEmailChange={handleEmailChange}
    />
  );
};

const UserEmail = () => {
  const email = useAtomValue(userEmailAtom);

  return (
    <div>
      <UserEmailTemplate
        email={email}
        syntax='const email = useAtomValue(userEmailAtom);'
      />
    </div>
  );
};

const JotaiExample = () => {
  const [count, setCount] = useAtom(countAtom);

  const increment = useCallback(() => setCount(prev => prev + 1), [setCount]);
  const decrement = useCallback(() => setCount(prev => prev - 1), [setCount]);
  const reset = useCallback(() => setCount(0), [setCount]);

  return (
    <div className='my-4 flex flex-col gap-4'>
      <Typography variant='h3'>Jotai Example</Typography>
      <CounterResult value={count} />
      <CounterControl
        decrement={decrement}
        increment={increment}
        reset={reset}
      />
      <UserForm />
      <div className='flex flex-col gap-4 bg-white p-4'>
        <UserName />
        <UserEmail />
      </div>
    </div>
  );
};

export default JotaiExample;
