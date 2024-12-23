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
  const titleTyped = useRef<Typed | null>(null);

  const subtitleElement = useRef(null);
  const subtitleTyped = useRef<Typed | null>(null);

  useEffect(() => {
    if (!titleElement.current) {
      return;
    }

    const options = {
      strings: ['This is Tod From Taiwan'],
      onComplete: () => setIsTitleFinished(true),
      ...typedOptions,
    };

    titleTyped.current = new Typed(titleElement.current, options);

    return () => {
      if (!titleTyped.current) return;
      titleTyped.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (!subtitleElement.current || !isTitleFinished) {
      return;
    }

    const options = {
      strings: ['努力嘗試分享的前端工程師\n希望有任何一篇文章能夠幫助到你！'],
      ...typedOptions,
    };

    subtitleTyped.current = new Typed(subtitleElement.current, options);

    return () => {
      if (!subtitleTyped.current) return;
      subtitleTyped.current.destroy();
    };
  }, [isTitleFinished]);

  return (
    <div className='relative my-4 flex flex-col items-center justify-center md:h-[50vh]'>
      <div
        className='flex size-full min-h-64 flex-col items-start
          justify-center rounded-md p-5 sm:max-w-screen-xl md:h-64
        '
      >
        <h1
          ref={titleElement}
          className='mb-4 text-6xl text-amber-200 sm:text-8xl'
        />
        <div ref={subtitleElement} className='text-2xl sm:text-3xl' />
      </div>
    </div>
  );
};

export default EntryContent;
