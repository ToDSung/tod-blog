import { FC } from 'react';

import ExternalLink from '../../ExternalLink';

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
            className={`article__title my-1 text-xl font-bold ${
              titleLink && 'article__title--has-link'
            }`}
          >
            {/* {{ title }} */}
          </h2>
        </ExternalLink>
      ) : (
        <div className='article__title-container my-1 flex flex-wrap text-xl font-bold'>
          <h2 className='article__title sm:mr-4'>{title}</h2>
          <h2 className='article__date'>{date}</h2>
        </div>
      )}
      <p className='article__subtitle indent-8'>{subtitle}</p>
      <p className='article__paragraph my-0.5 indent-8'>{paragraph}</p>
      {ulContents.map(({ title: ulTitle, content: liContents = [] }, index) => (
        <div key={index} className='lineup my-1'>
          <h3 className='lineup__title mb-2 text-lg font-bold md:mb-0 md:text-base'>
            {ulTitle}
          </h3>
          <ul className='ul sm:ml-8 sm:list-disc md:ml-14'>
            {liContents.map((li_content, index) => (
              <li className='li indent-8 leading-7 sm:indent-0' key={index}>
                {li_content}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Article;
