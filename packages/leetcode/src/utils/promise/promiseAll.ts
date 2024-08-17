const promiseAll = <T>(args: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    if (args.length === 0) {
      resolve([]);
      return;
    }

    const result: T[] = [];
    let completedCount = 0;

    args.forEach((promise, index) => {
      promise.then(
        value => {
          result[index] = value;
          completedCount++;

          if (completedCount === args.length) {
            resolve(result);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

export default promiseAll;
