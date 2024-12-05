import Typography from '@/components/Typography';

interface UserNameTemplateProps {
  name: string;
}

const UserNameTemplate = ({ name }: UserNameTemplateProps) => {
  return (
    <div className='flex flex-col gap-4 bg-white p-4'>
      <Typography variant='h5' className='text-black'>
        user name: {name}
      </Typography>
    </div>
  );
};

export default UserNameTemplate;
