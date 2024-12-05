import { TextField } from '@mui/material';

interface UserFormControlProps {
  name: string;

  email: string;

  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserFormControl = ({
  name,
  email,
  onNameChange,
  onEmailChange,
}: UserFormControlProps) => {
  return (
    <div className='flex flex-col gap-4 bg-white p-4'>
      <TextField
        id='name'
        label='name'
        variant='outlined'
        value={name}
        onChange={onNameChange}
      />
      <TextField
        id='email'
        label='email'
        variant='filled'
        value={email}
        onChange={onEmailChange}
      />
    </div>
  );
};

export default UserFormControl;
