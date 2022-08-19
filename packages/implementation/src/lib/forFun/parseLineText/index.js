const fs = require('fs');
const path = require('node:path');

// const DATE_REGEX = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])/;

const DATE_REGEX = /^2022\/08\/(0[1-9]|[12][0-9]|3[01])/;

const getParsedResult = text => {
  const data = text.split(/\r?\n/);
  let date = 'YYYY/MM/dd (day)';

  return data.reduce((accumulator, line) => {
    if (line.split('\t')[0].match(DATE_REGEX)) {
      date = line.split('\t')[0];
      console.log(date);
    }

    if (
      (date !== 'YYYY/MM/dd (day)' && line.includes('上午')) ||
      line.includes('下午')
    ) {
      const [time, author, content] = line.split('\t');
      const records = `${time} ${content}`;
      if (accumulator[author]) {
        if (accumulator[author][date]) {
          return {
            ...accumulator,
            [author]: {
              ...accumulator[author],
              [date]: [...accumulator[author][date], records],
            },
          };
        }

        return {
          ...accumulator,
          [author]: { ...accumulator[author], [date]: [records] },
        };
      }

      return {
        ...accumulator,
        [author]: { [date]: [records] },
      };
    }

    return accumulator;
  }, {});
};

const makeJsonFile = data =>
  fs.writeFileSync(path.join(__dirname, 'result.json'), data);

try {
  const text = fs.readFileSync(path.join(__dirname, './chat.txt'), 'utf8');
  const result = getParsedResult(text);
  makeJsonFile(JSON.stringify(result, null, 2));
} catch (err) {
  console.error(err);
}
