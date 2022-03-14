import Image from 'next/image';

const EntryContent = () => {
  return (
    <div className='entry-content relative my-4 flex flex-col justify-center'>
      <div className='image__wrapper'>
        <Image
          src='/entryImage.jpg'
          width='3840'
          height='2160'
          objectFit='contain'
          alt='entryImage'
          className='rounded-2xl'
        />
      </div>
      <div
        className='text__wrapper absolute left-[10vw] bottom-0 flex h-96 w-96 flex-col 
          items-center justify-center rounded-tl-[30%] rounded-tr-[60%]
          rounded-bl-[37%] rounded-br-[40%] bg-white p-5
        '
      >
        <h1 className="introduction__title mb-4 font-['DiamorScript'] text-8xl text-amber-800">
          I am ToD
        </h1>
        <div className="introduction__content font-['JasonHandwriting'] text-3xl">
          <p>努力嘗試分享的小小前端</p>
          <p>希望這邊有任何一篇文章能夠幫助到你！</p>
        </div>
      </div>
    </div>
  );
};

export default EntryContent;
