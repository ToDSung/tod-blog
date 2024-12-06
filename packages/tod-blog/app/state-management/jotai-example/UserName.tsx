import { useAtom } from 'jotai';

import UserNameTemplate from '../component/UserNameTemplate';

import { userAtom } from './atoms/userAtom';
const UserName = () => {
  const [{ name }] = useAtom(userAtom);

  return (
    <UserNameTemplate
      name={name}
      syntax='const [{ name }] = useAtom(userAtom);'
    />
  );
};

export default UserName;
