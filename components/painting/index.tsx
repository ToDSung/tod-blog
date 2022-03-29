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
    <div className='rounded-lg'>
      <div className='focus-ring w-full rounded-lg object-cover object-center backdrop-blur-xl transition' />
      {src && (
        <Image
          src={src}
          alt={alt}
          layout='fill'
          className="
            focus-ring transition-opacity' rounded-lg object-cover object-center transition
          "
        />
      )}
    </div>
  );
};

export default Painting;
