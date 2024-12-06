import UserNameTemplate from '../../component/UserNameTemplate';
import useUserStore from '../store/userStore';

const UserName = () => {
  const {
    user: { name },
  } = useUserStore();

  return (
    <UserNameTemplate
      name={name}
      syntax='const { user: { name } } = useUserStore();'
    />
  );
};

export default UserName;
