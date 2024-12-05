import { Button } from '@mui/material';

interface CounterControlProps {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const CounterControl = ({
  increment,
  decrement,
  reset,
}: CounterControlProps) => {
  return (
    <div className='flex gap-4'>
      <Button variant='contained' onClick={reset}>
        Reset
      </Button>
      <Button variant='contained' onClick={decrement}>
        -
      </Button>
      <Button variant='contained' onClick={increment}>
        +
      </Button>
    </div>
  );
};

export default CounterControl;
