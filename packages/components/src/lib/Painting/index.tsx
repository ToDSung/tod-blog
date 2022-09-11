import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
  onLoadingComplete?: () => void;
  className?: string;
};

const Painting = ({
  src,
  alt = 'a painting',
  onLoadingComplete = () => {
    // do notiong.
  },
  className = '',
}: Props) => {
  return (
    <>
      {src && (
        <Image
          src={src}
          alt={alt}
          layout='fill'
          className={`
            hover-ring object-cover object-center transition-opacity
            ${className}
          `}
          onLoadingComplete={onLoadingComplete}
        />
      )}
    </>
  );
};

export default Painting;
