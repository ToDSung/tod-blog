import Typography from '@/components/Typography';

interface UserEmailTemplateProps {
  email: string;
}

const UserEmailTemplate = ({ email }: UserEmailTemplateProps) => {
  return (
    <div className='flex flex-col gap-4 bg-white p-4'>
      <Typography variant='h5' className='text-black'>
        user email: {email}
      </Typography>
    </div>
  );
};

export default UserEmailTemplate;
