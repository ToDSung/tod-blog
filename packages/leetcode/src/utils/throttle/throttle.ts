const throttle = <T extends (...args: any) => any>(fn: T, delay: number) => {
  let id: ReturnType<typeof setTimeout>;
  let lastExecTime = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastExecTime >= delay) {
      lastExecTime = now;
      return fn(...args);
    }

    if (id !== null) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      lastExecTime = Date.now();
      fn(...args);
    }, delay - (now - lastExecTime));
  };
};

export default throttle;
