import { MenuItem, Select, type SelectChangeEvent } from '@mui/material';

import Typography from '@/components/Typography';

import { useTimezone } from '../TimezoneContext';

const TimezoneSelect = () => {
  const { timezone, setTimezone } = useTimezone();

  const handleTimezoneChange = (event: SelectChangeEvent) => {
    setTimezone(event.target.value);
  };

  return (
    <div className='flex items-center gap-4'>
      <div className='flex w-48 flex-col'>
        <Typography variant='h4' className='text-green-900'>
          Timezone:
        </Typography>
        <Typography variant='h4' className='text-green-900'>
          {timezone}
        </Typography>
      </div>
      <Select value={timezone} onChange={handleTimezoneChange}>
        <MenuItem value={'America/New_York'}>New York (UTC - 5)</MenuItem>
        <MenuItem value={'Europe/London'}>London (UTC + 0)</MenuItem>
        <MenuItem value={'Europe/Istanbul'}>Turkiye (UTC + 3)</MenuItem>
        <MenuItem value={'Asia/Taipei'}>Taipei (UTC + 8)</MenuItem>
      </Select>
    </div>
  );
};

export default TimezoneSelect;
