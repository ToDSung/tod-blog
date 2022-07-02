export const curry = func => {
  // const curried = (...args: any[]) => {
  //   console.log(args);
  // };

  return function curried(...args) {
    if (args.length >= func.length) {
      // no need to curry
      return func.apply(this, args);
    } else {
      return function (...args2) {
        // recursive
        return curried.apply(this, args.concat(args2));
      };
    }
  };
};

export default curry;
