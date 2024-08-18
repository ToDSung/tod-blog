type Fn = (...args: any[]) => any;

type LastReturnType<L extends Fn[]> = L extends [...any, infer Last extends Fn]
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
