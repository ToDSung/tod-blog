import lodashGet from 'lodash/get';

// eslint-disable-next-line no-useless-escape
const regex = /[\[\]\.]/g;

const get = (
  object: Record<string, unknown>,
  paths: string[] | string,
  defaultValue?: any
) => {
  if (typeof paths === 'string') {
    return lodashGet(object, paths, defaultValue);
  }

  const parsedPaths = paths
    .flatMap(path => {
      const result = path.split(regex);
      return result;
    })
    .filter(path => path !== '');

  return lodashGet(object, parsedPaths, defaultValue);
};

export default get;
