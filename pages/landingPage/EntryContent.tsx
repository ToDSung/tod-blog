import Painting from '@/components/painting';
import useLoading from '@/contexts/loading';

const EntryContent = () => {
  const { setLoading } = useLoading();
  const handlePaintingLoaded = () => {
    setLoading(false);
  };

  return (
    <div className='entry-content relative my-4 flex flex-col justify-center'>
      <div className='image__wrapper aspect-h-9 aspect-w-16 hidden rounded-2xl md:block'>
        <Painting
          src='/entryImage.jpg'
          alt='entryImage'
          onLoadingComplete={handlePaintingLoaded}
        />
      </div>
      <div
        className='text__wrapper left-[10vw] bottom-0 flex h-full w-full flex-col items-center 
          justify-center rounded-tl-[30%] rounded-tr-[60%] rounded-bl-[37%]
          rounded-br-[40%] bg-white p-5 sm:w-96 md:absolute md:h-96
        '
      >
        <h1 className="introduction__title mb-4 font-['DiamorScript'] text-6xl text-amber-800 sm:text-8xl">
          I am ToD
        </h1>
        <div className="introduction__content font-['JasonHandwriting'] text-2xl sm:text-3xl">
          <p>努力嘗試分享的小小前端</p>
          <p>希望這邊有任何一篇文章能夠幫助到你！</p>
        </div>
      </div>
    </div>
  );
};

export default EntryContent;
