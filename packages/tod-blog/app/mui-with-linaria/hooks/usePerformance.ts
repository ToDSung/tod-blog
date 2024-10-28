import { useEffect } from 'react';

const usePerformance = (name: string) => {
  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      console.log(`Component ${name} render time: ${end - start}ms`);
    };
  }, [name]);
};

export default usePerformance;
