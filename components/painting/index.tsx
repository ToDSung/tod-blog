import { FC } from 'react';
import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string;
  onLoadingComplete?: Function;
};

const Painting: FC<Props> = ({
  src,
  alt = 'a painting',
  onLoadingComplete = null,
}) => {
  return (
    <>
      {src && (
        <Image
          src={src}
          alt={alt}
          layout='fill'
          className='
            hover-ring rounded-lg object-cover object-center   transition-opacity
          '
          onLoadingComplete={() => {
            onLoadingComplete && onLoadingComplete();
          }}
        />
      )}
    </>
  );
};

export default Painting;
