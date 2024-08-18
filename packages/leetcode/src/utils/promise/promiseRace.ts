const promiseRace = <T>(args: Promise<T>[]) => {
  return new Promise((resolve, reject) => {
    if (args.length === 0) {
      return;
    }

    args.forEach(promise => {
      promise.then(
        value => {
          resolve(value);
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

export default promiseRace;
