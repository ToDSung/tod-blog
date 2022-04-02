import { FC } from 'react';
import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string;
  borderColor?: string;
};

const Painting: FC<Props> = ({
  src,
  alt = 'a painting',
  borderColor = 'green',
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
        />
      )}
    </>
  );
};

export default Painting;
