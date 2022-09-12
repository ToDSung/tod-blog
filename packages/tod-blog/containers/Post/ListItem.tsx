import { FC } from 'react';
import Link from 'next/link';

import Painting from '@curi/components/Painting';

import Post from '@/types/post';

const ListItem: FC<Post> = ({ title, slug, excerpt, labels, date, image }) => {
  return (
    <div className='list border-item-border bg-sub-canvas my-4 grid gap-2 rounded border py-2 md:grid-cols-4'>
      <div className='list__content col-span-3 flex w-full flex-col px-2'>
        <Link href={`/posts/${slug}`} passHref>
          <div className='mb-2 flex-1'>
            <span className='list__title text-blue-grey-800 cursor-pointer text-2xl font-semibold leading-8'>
              {title}
            </span>
            <p className='list__excerpt line-clamp-4 my-2 mx-0 cursor-pointer text-ellipsis text-gray-300'>
              {excerpt}
            </p>
          </div>
        </Link>
        <div className='flex flex-col sm:flex-row'>
          <div className='labels mb-2 flex flex-wrap gap-2 sm:mb-0'>
            {labels?.map(label => (
              <span
                key={label}
                className='label__item cursor-default rounded-2xl bg-slate-700 px-2 py-[0.125rem]'
              >
                {label}
              </span>
            ))}
          </div>
          {date && (
            <span className='list__time grow self-end text-right text-sm'>
              最後修改時間： {new Date(date).toISOString().slice(0, 10)}
            </span>
          )}
        </div>
      </div>
      <div className='list__image aspect-h-9 aspect-w-16 mx-2 hidden md:block'>
        <Painting src={image} className='rounded-lg' />
      </div>
    </div>
  );
};

export default ListItem;
