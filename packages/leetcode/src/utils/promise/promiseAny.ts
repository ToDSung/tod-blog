const promiseAny = <T>(args: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    if (args.length === 0) {
      reject(new Error('All promises were rejected'));
      return;
    }

    const result: T[] = [];
    let completedCount = 0;

    args.forEach((promise, index) => {
      promise.then(
        value => {
          resolve(value);
        },
        error => {
          result[index] = error;
          completedCount++;
          if (completedCount === args.length) {
            reject(new Error('No Promise in Promise.any was resolved'));
          }
        }
      );
    });
  });
};

export default promiseAny;
