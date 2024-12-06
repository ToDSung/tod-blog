import { useRecoilState } from 'recoil';

import UserNameTemplate from '../component/UserNameTemplate';

import { userAtom } from './atoms/userAtom';

const UserName = () => {
  const [{ name }] = useRecoilState(userAtom);

  return (
    <UserNameTemplate
      name={name}
      syntax='const [{ name }] = useRecoilState(userAtom);'
    />
  );
};

export default UserName;
