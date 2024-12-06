import Typography from '@/components/Typography';

interface UserEmailTemplateProps {
  email: string;

  syntax?: string;
}

const UserEmailTemplate = ({ email, syntax }: UserEmailTemplateProps) => {
  return (
    <div className='flex flex-col gap-2 bg-white'>
      <Typography className='text-black'>user email: {email}</Typography>
      {syntax && <Typography className='text-gray-500'>{syntax}</Typography>}
      <Typography className='text-green-700'>
        修改 name 的時候，這個 component 不會觸發 render function
      </Typography>
    </div>
  );
};

export default UserEmailTemplate;
