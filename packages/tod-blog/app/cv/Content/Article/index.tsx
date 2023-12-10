import { FC } from 'react';

import UnorderedList from '@curi/components/List/UnorderedList';
import Paragraph from '@curi/components/Paragraph';

type Props = {
  title: string;
  date: string;
  subtitle?: string;
  paragraph: string;
  ulContents: {
    title: string;
    content: string[];
  }[];
};

const Article: FC<Props> = ({
  title,
  date,
  subtitle,
  paragraph,
  ulContents = [],
}) => {
  return (
    <div className='article flex flex-col'>
      <div className='article__title-container my-1 flex flex-wrap text-xl'>
        <h2 className='article__title sm:mr-4'>{title}</h2>
        <h2 className='article__date'>{date}</h2>
      </div>
      <Paragraph className='article__subtitle'>{subtitle}</Paragraph>
      <Paragraph className='article__paragraph'>{paragraph}</Paragraph>
      {ulContents.map(({ title: ulTitle, content: liContents = [] }, index) => (
        <div key={index} className='lineup my-1'>
          <h3 className='lineup__title mb-2 text-lg font-bold md:mb-0 md:text-base indent-4'>
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
