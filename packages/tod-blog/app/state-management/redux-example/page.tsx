'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store/baseStore';
import type { ChangeEvent } from 'react';

import Typography from '@/components/Typography';

import CounterControl from '../component/CounterControl';
import CounterResult from '../component/CounterResult';
import UserEmailTemplate from '../component/UserEmailTemplate';
import UserFormControl from '../component/UserFormControl';
import UserNameTemplate from '../component/UserNameTemplate';
import useUserStore from '../zustand-example/store/userStore';

import {
  decrement as decrementCount,
  increment as incrementCount,
  reset as resetCount,
} from './store/counterStore';
import { setEmail, setName } from './store/userStore';

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

const UserName = () => {
  const {
    user: { name },
  } = useSelector((state: RootState) => state.user);

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
  const email = useSelector((state: RootState) => {
    return state.user.user.email;
  });

  return (
    <div>
      <Typography className='text-green-700'>
        修改 name 的時候，這個 component 不會觸發 render function
      </Typography>
      <UserEmailTemplate email={email} />
    </div>
  );
};

const UserEmailFromZustand = () => {
  const email = useUserStore(state => {
    return state.user.email;
  });

  return (
    <div>
      <Typography className='text-green-700'>
        修改 name 的時候，這個 component 不會觸發 render function
      </Typography>
      <UserEmailTemplate email={email} />
    </div>
  );
};

const ReduxExample = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch<AppDispatch>();

  const decrement = useCallback(() => dispatch(decrementCount()), [dispatch]);
  const increment = useCallback(() => dispatch(incrementCount()), [dispatch]);
  const reset = useCallback(() => dispatch(resetCount()), [dispatch]);

  useEffect(() => {
    console.log('is object equal?');
  }, [increment]);

  return (
    <div className='my-4 flex w-[1280px] flex-col gap-4'>
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
        <UserEmailFromZustand />
      </div>
    </div>
  );
};

export default ReduxExample;
