import Typography from '@/components/Typography';
import UnorderedList from '@/components/UnorderedList';

interface ArticleProps {
  title: string;
  date: string;
  items: string[];
}

const Article = ({ title, date, items = [] }: ArticleProps) => {
  return (
    <div className='flex flex-col'>
      <div className='my-1 flex flex-wrap justify-between text-xl'>
        <Typography variant='h4'>{title}</Typography>
        <Typography variant='h4'>{date}</Typography>
      </div>
      <div className='my-1 gap-1'>
        <UnorderedList items={items} className='ml-6 md:ml-10' />
      </div>
    </div>
  );
};

export default Article;
