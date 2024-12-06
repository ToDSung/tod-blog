'use client';

import type { ChangeEvent } from 'react';

import Typography from '@/components/Typography';

import CounterControl from '../../component/CounterControl';
import CounterResult from '../../component/CounterResult';
import UserEmailTemplate from '../../component/UserEmailTemplate';
import UserFormControl from '../../component/UserFormControl';
import useCounterStore from '../store/counterStore';
import { useUserStore } from '../store/userStoreProvider';

import UserName from './UserName';

const UserForm = () => {
  const { user, setName, setEmail } = useUserStore(state => state);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
  const email = useUserStore(state => state.user.email);

  return (
    <UserEmailTemplate
      email={email}
      syntax='  const email = useUserStore(state => state.user.email);'
    />
  );
};

const ZustandExampleVanilla = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className='my-4 flex flex-col gap-4'>
      <Typography variant='h3'>Zustand Vanilla Example</Typography>
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

export default ZustandExampleVanilla;
