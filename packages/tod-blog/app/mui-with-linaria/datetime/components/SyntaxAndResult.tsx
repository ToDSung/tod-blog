import Typography from '@/components/Typography';

interface SyntaxAndResultProps {
  syntax: string;
  result: string;
}

const SyntaxAndResult = ({ syntax, result }: SyntaxAndResultProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <Typography variant='h5' className='text-green-700'>
        Syntax: {syntax}
      </Typography>
      <Typography variant='h5' className='text-black'>
        {result}
      </Typography>
    </div>
  );
};

export default SyntaxAndResult;
