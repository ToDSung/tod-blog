import { FC } from 'react';
import Image from 'next/image';

type GuideItemProps = {
  name?: string;
  imageSrc: string;
  width?: string;
  height?: string;
};

const GuideItem: FC<GuideItemProps> = ({ name, imageSrc, width, height }) => (
  <div className='flex'>
    {width && height ? (
      <Image
        src={imageSrc}
        width={width}
        height={height}
        objectFit='contain'
        alt='entryImage'
      />
    ) : (
      <Image
        src={imageSrc}
        objectFit='contain'
        layout='fill'
        // layout="intrinsic"
        alt='entryImage'
      />
    )}
    <span className='absolute z-10'>{name}</span>
  </div>
);

const postsExample = [
  '/mock_image/column.jpg',
  '/mock_image/column.jpg',
  '/mock_image/column.jpg',
];

type GuideProps = {
  topRows: string[];
};

const Guide: FC<GuideProps> = ({ topRows = postsExample }) => {
  return (
    <>
      <h2 className="guide my-4 font-['DiamorScript'] text-6xl">Guide</h2>
      <div className='guide grid grid-cols-3 grid-rows-3 gap-6 '>
        <div className='guide__wrapper col-span-2 text-center'>
          <GuideItem imageSrc='/mock_image/row.jpg' width='900' height='506' />
        </div>
        <div className='guide__wrapper text-center' />
        {topRows.map((post, index) => {
          return (
            <div className='guide__wrapper row-span-2 text-center' key={index}>
              <GuideItem imageSrc={post} name={post} width='400' height='600' />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Guide;
