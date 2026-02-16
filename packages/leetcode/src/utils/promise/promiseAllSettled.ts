type FulfilledReturn<T> = { status: 'resolved'; value: T };
type RejectedReturn = { status: 'rejected'; reason: unknown };

type Return<T> = FulfilledReturn<T> | RejectedReturn;

const promiseAllSettled = <T>(args: Promise<T>[]): Promise<Return<T>[]> => {
  return new Promise(resolve => {
    if (args.length === 0) {
      resolve([]);
      return;
    }

    const result: Return<T>[] = [];
    let completedCount = 0;

    args.forEach((arg, index) => {
      arg.then(
        value => {
          result[index] = { status: 'resolved', value };
          completedCount++;
          if (completedCount === args.length) {
            resolve(result);
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => {
          result[index] = { status: 'rejected', reason: error };
          completedCount++;
          if (completedCount === args.length) {
            resolve(result);
          }
        }
      );
    });
  });
};

export default promiseAllSettled;
