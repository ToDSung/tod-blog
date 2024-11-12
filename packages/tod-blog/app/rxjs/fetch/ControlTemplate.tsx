import Button from '@mui/material/Button';

import type { ApiResponse } from './utils';

interface ControlTemplateProps {
  title: string;
  description?: string;
  data: ApiResponse[];
  startTime: number;
  isLoading: boolean;
  onFetchClick: () => void;
  onCancelClick: () => void;
}

const ControlTemplate = ({
  title,
  description,
  data,
  startTime,
  isLoading,
  onFetchClick,
  onCancelClick,
}: ControlTemplateProps) => {
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-bold'>{title}</h2>
      <div className='space-x-4'>
        <Button variant='contained' onClick={onFetchClick}>
          {isLoading ? 'Fetching...' : 'Fetch'}
        </Button>
        <Button
          variant='contained'
          onClick={onCancelClick}
          disabled={!isLoading}
          color='secondary'
        >
          Cancel
        </Button>
      </div>
      {description && <div>{description}</div>}
      <div>
        {isLoading && <div>Loading...</div>}
        <h3 className='font-bold'>Results:</h3>
        {data?.map((response, index) => (
          <div key={index} className='ml-4'>
            <p>API {index + 1} Response:</p>
            <p>Data: {JSON.stringify(response.data)}</p>
            <p>Time: {response.timestamp - startTime}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ControlTemplate;
