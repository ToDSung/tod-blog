import { useSelector } from 'react-redux';

import type { RootState } from './store/baseStore';

import UserNameTemplate from '../component/UserNameTemplate';

const UserName = () => {
  const {
    user: { name },
  } = useSelector((state: RootState) => state.user);

  return (
    <UserNameTemplate
      name={name}
      syntax='const { user: { name } } = useSelector((state: RootState) => state.user);'
    />
  );
};

export default UserName;
