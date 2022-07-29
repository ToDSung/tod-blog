import { FC } from 'react';

import ExternalLink from '@/components/ExternalLink';
import UnorderedList from '@/components/List/UnorderedList';
import Paragraph from '@/components/Paragrath';

type Props = {
  title: string;
  date: string;
  subtitle?: string;
  titleLink?: string;
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
  titleLink,
  paragraph,
  ulContents = [],
}) => {
  return (
    <div className='article flex flex-col'>
      {titleLink ? (
        <ExternalLink href={titleLink}>
          <h2
            className={`article__title my-1 ${
              titleLink && 'article__title--has-link'
            }`}
          >
            {/* {{ title }} */}
          </h2>
        </ExternalLink>
      ) : (
        <div className='article__title-container my-1 flex flex-wrap text-xl'>
          <h2 className='article__title sm:mr-4'>{title}</h2>
          <h2 className='article__date'>{date}</h2>
        </div>
      )}
      <Paragraph className='article__subtitle'>{subtitle}</Paragraph>
      <Paragraph className='article__paragraph'>{paragraph}</Paragraph>
      {ulContents.map(({ title: ulTitle, content: liContents = [] }, index) => (
        <div key={index} className='lineup my-1'>
          <h3 className='lineup__title mb-2 text-lg font-bold md:mb-0 md:text-base'>
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
