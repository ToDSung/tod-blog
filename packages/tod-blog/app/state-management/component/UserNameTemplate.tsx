import Typography from '@/components/Typography';

interface UserNameTemplateProps {
  name: string;

  syntax?: string;
}

const UserNameTemplate = ({ name, syntax }: UserNameTemplateProps) => {
  return (
    <div className='flex flex-col gap-2 bg-white'>
      <Typography className='text-black'>user name: {name}</Typography>
      {syntax && <Typography className='text-gray-500'>{syntax}</Typography>}
      <Typography className='text-red-500'>
        修改 email 的時候，這個 component 會觸發 render function
      </Typography>
    </div>
  );
};

export default UserNameTemplate;
