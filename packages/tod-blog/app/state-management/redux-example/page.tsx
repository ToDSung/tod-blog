'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store/baseStore';
import type { ChangeEvent } from 'react';

import Typography from '@/components/Typography';

import CounterControl from '../component/CounterControl';
import CounterResult from '../component/CounterResult';
import UserEmailTemplate from '../component/UserEmailTemplate';
import UserFormControl from '../component/UserFormControl';

import {
  decrement as decrementCount,
  increment as incrementCount,
  reset as resetCount,
} from './store/counterStore';
import { setEmail, setName } from './store/userStore';
import UserName from './UserName';

const UserForm = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName({ name: e.target.value }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail({ email: e.target.value }));
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
  const email = useSelector((state: RootState) => state.user.user.email);

  return (
    <UserEmailTemplate
      email={email}
      syntax='const email = useSelector((state: RootState) => state.user.user.email);
'
    />
  );
};

const ReduxExample = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch<AppDispatch>();

  const decrement = useCallback(() => dispatch(decrementCount()), [dispatch]);
  const increment = useCallback(() => dispatch(incrementCount()), [dispatch]);
  const reset = useCallback(() => dispatch(resetCount()), [dispatch]);

  return (
    <div className='my-4 flex flex-col gap-4'>
      <Typography variant='h3'>Redux Example</Typography>
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

export default ReduxExample;
