export const get: (
  object: object,
  path: string | string[],
  defaultValue?: any
) => any = (object, path, defaultValue) => {
  let keys = path;
  if (typeof path === 'string') {
    keys = path.split(/\[|\]|\./).filter(value => value);
  }

  let result = object;
  for (const key of keys) {
    // avoid null and undefined
    result = Object(result)[key];
    if (result == undefined) {
      return defaultValue;
    }
  }
  return result;
};
