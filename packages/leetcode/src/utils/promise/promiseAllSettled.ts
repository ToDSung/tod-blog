type FullfilledReturn<T> = { status: 'resolved'; value: T };
type RejectedReturn = { status: 'rejected'; reason: any };

type Return<T> = FullfilledReturn<T> | RejectedReturn;

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
