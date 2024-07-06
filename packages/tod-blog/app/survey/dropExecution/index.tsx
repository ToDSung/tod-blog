import { useEffect, useRef, useState } from 'react';
import { from, fromEvent, race } from 'rxjs';
import { map } from 'rxjs/operators';

const timeout: (ms: number) => Promise<() => void> = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const DropExecution = () => {
  const [value, setValue] = useState<number[]>([]);
  const [doSubscribe, setDoSubscribe] = useState(false);

  const buttonRef = useRef(null);
  useEffect(() => {
    if (!doSubscribe || !buttonRef.current) return;

    const cancel = fromEvent(buttonRef.current, 'click').pipe(
      map(() => {
        return {
          result: [],
          error: [],
          stop: true,
        };
      })
    );

    const test = race(from(mockCheckFolder()), cancel).subscribe(
      ({ result, error, stop }) => {
        console.log(result, error, stop);
        setValue(() => result);
        setDoSubscribe(false);
      }
    );

    return () => {
      test.unsubscribe();
    };
  }, [doSubscribe]);

  const handleDo = () => setDoSubscribe(true);

  const mockCheckFolder = async () => {
    await timeout(3000);
    return {
      result: [1, 2, 3],
      error: [4, 5, 6],
      stop: false,
    };
  };

  return (
    <main className='map__container h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.25rem)]'>
      <div>{JSON.stringify(value)}</div>
      <div>
        <button onClick={handleDo}>do function execution</button>
      </div>
      <div>
        <button ref={buttonRef}>drop function execution</button>
      </div>
    </main>
  );
};

export default DropExecution;
