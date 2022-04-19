import { get } from 'lodash/fp';
import filter from 'lodash/fp/filter';
import flow from 'lodash/fp/flow';
import isEqual from 'lodash/fp/isEqual';

const fileName = 'image.png';

const getFileExtension: (fileName: string) => string = fileName =>
  fileName.split('.').slice(-1)[0];

const isFileCsv = flow([
  getFileExtension, //
  isEqual('csv'),
]);

const isFilePng = flow([
  getFileExtension, //
  isEqual('png'),
]);

const isDirectory = isEqual('directory');

const children = [
  {
    name: 'image.png',
    kind: 'file',
  },
  {
    name: 'label.csv',
    kind: 'file',
  },
  {
    name: 'images',
    kind: 'directory',
  },
];

const filterFileCsv = filter(
  flow([
    get('name'), //
    isFileCsv,
  ])
);

const filterFilePng = filter(
  flow([
    get('name'), //
    isFilePng,
  ])
);

const filterDirectory = filter(
  flow([
    get('kind'), //
    isDirectory,
  ])
);

const HomeFP = () => {
  return (
    <main className='map__container h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.25rem)]'>
      <div>isFileCsv: {`${isFileCsv(fileName)}`}</div>
      <div>isFilePng: {`${isFilePng(fileName)}`}</div>
      <br />
      <div>original children: {JSON.stringify(children)} </div>
      <div>filterFileCsv: {`${JSON.stringify(filterFileCsv(children))}`}</div>
      <div>filterFilePng: {`${JSON.stringify(filterFilePng(children))}`}</div>
      <div>
        filterDirectory: {`${JSON.stringify(filterDirectory(children))}`}
      </div>
    </main>
  );
};

export default HomeFP;
