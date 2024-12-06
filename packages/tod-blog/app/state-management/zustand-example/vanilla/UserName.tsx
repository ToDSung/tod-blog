import UserNameTemplate from '../../component/UserNameTemplate';
import { useUserStore } from '../store/userStoreProvider';

const UserName = () => {
  const {
    user: { name },
  } = useUserStore(state => state);

  return (
    <UserNameTemplate
      name={name}
      syntax=' const { user: { name } } = useUserStore(state => state);'
    />
  );
};

export default UserName;
