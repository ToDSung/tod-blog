// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any[]) => any;

type LastReturnType<L extends Fn[]> = L extends [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...any[],
  infer Last extends Fn,
]
  ? ReturnType<Last>
  : never;

const pipe =
  <T extends Fn[]>(...functionArgs: T) =>
  (init: Parameters<T[0]>[0]) =>
    functionArgs.reduce(
      (current, fn) => fn(current),
      init
    ) as LastReturnType<T>;

export default pipe;
