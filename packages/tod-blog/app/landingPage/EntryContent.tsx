'use client';
import { useEffect, useRef, useState } from 'react';

import Typed from 'typed.js';

const typedOptions = {
  typeSpeed: 50,
  showCursor: false,
};

const EntryContent = () => {
  const [isTitleFinished, setIsTitleFinished] = useState(false);

  const titleElement = useRef(null);
  const titleTyped: any = useRef(null);

  const subtitleElement = useRef(null);
  const subtitleTyped: any = useRef(null);

  useEffect(() => {
    if (!titleElement.current) {
      return;
    }

    const options = {
      strings: ['I am ToD'],
      onComplete: () => setIsTitleFinished(true),
      ...typedOptions,
    };

    titleTyped.current = new Typed(titleElement.current, options);

    return () => {
      titleTyped.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (!subtitleElement.current || !isTitleFinished) {
      return;
    }

    const options = {
      strings: ['努力嘗試分享的小小前端\n希望這邊有任何一篇文章能夠幫助到你！'],
      ...typedOptions,
    };

    subtitleTyped.current = new Typed(subtitleElement.current, options);

    return () => {
      subtitleTyped.current.destroy();
    };
  }, [isTitleFinished]);

  return (
    <div className='entry-content relative my-4 flex flex-col items-center justify-center md:h-[50vh]'>
      <div
        className='text__wrapper flex h-full min-h-[16rem] w-full flex-col
          items-start justify-center rounded-md p-5 sm:max-w-[1280px] md:h-64
        '
      >
        <h1
          ref={titleElement}
          className="introduction__title mb-4 font-['DiamorScript'] text-6xl text-amber-200 sm:text-8xl"
        />
        <div
          ref={subtitleElement}
          className="introduction__content font-['JasonHandwriting'] text-2xl sm:text-3xl"
        />
      </div>
    </div>
  );
};

export default EntryContent;
