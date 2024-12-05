'use client';

import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import type { ChangeEvent } from 'react';

import Typography from '@/components/Typography';

import CounterControl from '../component/CounterControl';
import CounterResult from '../component/CounterResult';
import UserEmailTemplate from '../component/UserEmailTemplate';
import UserFormControl from '../component/UserFormControl';
import UserNameTemplate from '../component/UserNameTemplate';

import { countAtom } from './atoms/counterAtom';
import { userAtom, userEmailAtom } from './atoms/userAtom';

const UserForm = () => {
  const [user, setUser] = useRecoilState(userAtom);

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

const UserName = () => {
  const [{ name }] = useRecoilState(userAtom);

  return (
    <div>
      <Typography className='text-red-500'>
        修改 email 的時候，這個 component 會觸發 render function
      </Typography>
      <UserNameTemplate name={name} />
    </div>
  );
};

const UserEmail = () => {
  const email = useRecoilValue(userEmailAtom);

  return (
    <div>
      <Typography className='text-green-700'>
        修改 name 的時候，這個 component 不會觸發 render function
      </Typography>
      <UserEmailTemplate email={email} />
    </div>
  );
};

const RecoilExample = () => {
  const [count, setCount] = useRecoilState(countAtom);

  const increment = useCallback(() => setCount(prev => prev + 1), [setCount]);
  const decrement = useCallback(() => setCount(prev => prev - 1), [setCount]);
  const reset = useCallback(() => setCount(0), [setCount]);

  useEffect(() => {
    console.log('is object equal?');
  }, [increment]);

  return (
    <div className='my-4 flex w-[1280px] flex-col gap-4'>
      <Typography variant='h3'>Recoil Example</Typography>
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

export default RecoilExample;
