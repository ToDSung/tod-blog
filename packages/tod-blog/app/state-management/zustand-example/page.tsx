'use client';

import { useEffect } from 'react';

import type { ChangeEvent } from 'react';

import Typography from '@/components/Typography';

import CounterControl from '../component/CounterControl';
import CounterResult from '../component/CounterResult';
import UserEmailTemplate from '../component/UserEmailTemplate';
import UserFormControl from '../component/UserFormControl';
import UserNameTemplate from '../component/UserNameTemplate';

import useCounterStore from './store/counterStore';
import useUserStore from './store/userStore';

const UserForm = () => {
  const { user, setName, setEmail } = useUserStore();

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

const UserName = () => {
  const {
    user: { name },
  } = useUserStore();

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

const ZustandExample = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  useEffect(() => {
    console.log('is object equal?');
  }, [increment]);

  return (
    <div className='my-4 flex w-[1280px] flex-col gap-4'>
      <Typography variant='h3'>Zustand Example</Typography>
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

export default ZustandExample;
