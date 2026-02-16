/**
 * Creates a debounced function that delays invoking `fn` until after `delay` milliseconds have elapsed since the last time the debounced function was invoked.
 * @template T
 * @param {T} fn The function to debounce
 * @param {number} delay The number of milliseconds to delay
 * @returns {(...args: Parameters<T>) => void} A new debounced function
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let id: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(id);
    id = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default debounce;
