import Typography from '@/components/Typography';

interface CounterResultProps {
  value: number;
}

const CounterResult = ({ value }: CounterResultProps) => {
  return <Typography variant='h4'>The count value is {value}</Typography>;
};

export default CounterResult;
