import { FC } from 'react';
import Link from 'next/link';

import Post from '@/types/post';

const PostDetail: FC<Post> = ({ title, slug, excerpt, labels, date }) => {
  return (
    <div className='list my-4 flex flex-col rounded border border-item-border bg-sub-canvas py-2'>
      <div className='list__content mx-auto w-11/12 xl:w-4/5'>
        <Link href={`/posts/${slug}`} passHref>
          <div className='mb-2'>
            <span className='list__title text-blue-grey-800 cursor-pointer text-2xl font-semibold leading-8'>
              {title}
            </span>
            <p className='list__introduction mx-0 my-2 h-12 cursor-pointer text-ellipsis text-gray-300 line-clamp-2'>
              {excerpt}
            </p>
          </div>
        </Link>
        <div className='flex flex-col sm:flex-row'>
          <div className='labels flex flex-wrap gap-2'>
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
    </div>
  );
};

export default PostDetail;
