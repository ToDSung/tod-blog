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
  onLoadingComplete = () => {},
  classProps = '',
}) => {
  const handleLoadingComplete = () => onLoadingComplete();
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
          onLoadingComplete={handleLoadingComplete}
        />
      )}
    </>
  );
};

export default Painting;
