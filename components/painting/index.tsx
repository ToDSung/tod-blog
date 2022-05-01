import { FC } from 'react';
import Image from 'next/image';

type Props = {
  src?: string;
  alt?: string;
  onLoadingComplete?: Function;
  classProps?: string;
};

const Painting: FC<Props> = ({
  src,
  alt = 'a painting',
  onLoadingComplete = null,
  classProps = '',
}) => {
  return (
    <>
      {src && (
        <Image
          src={src}
          alt={alt}
          layout='fill'
          className={`
            hover-ring object-cover object-center transition-opacity
            ${classProps}
          `}
          onLoadingComplete={() => {
            onLoadingComplete && onLoadingComplete();
          }}
        />
      )}
    </>
  );
};

export default Painting;
