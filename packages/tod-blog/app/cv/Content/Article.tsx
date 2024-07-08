import Paragraph from '@/app/cv/components/Paragraph';
import UnorderedList from '@/app/cv/components/UnorderedList';

type ArticleProps = {
  title: string;
  date: string;
  subtitle?: string;
  paragraph: string;
  ulContents: {
    title: string;
    content: string[];
  }[];
};

const Article = ({
  title,
  date,
  subtitle,
  paragraph,
  ulContents = [],
}: ArticleProps) => {
  return (
    <div className='flex flex-col'>
      <div className='my-1 flex flex-wrap text-xl'>
        <h2 className='sm:mr-4'>{title}</h2>
        <h2>{date}</h2>
      </div>
      <Paragraph>{subtitle}</Paragraph>
      <Paragraph>{paragraph}</Paragraph>
      {ulContents.map(({ title: ulTitle, content: liContents = [] }, index) => (
        <div key={index} className='my-1'>
          <h3 className='mb-2 indent-4 text-lg font-bold md:mb-0 md:text-base'>
            {ulTitle}
          </h3>
          <UnorderedList
            items={liContents}
            className='sm:ml-8 md:ml-14'
            liProps={{ className: 'indent-8 sm:indent-0' }}
          />
        </div>
      ))}
    </div>
  );
};

export default Article;
