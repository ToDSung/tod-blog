import filter from 'lodash/fp/filter';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';
import isEqual from 'lodash/fp/isEqual';
import some from 'lodash/fp/some';

const fileName = 'image.png';

const isEndWithCsv: (fileName: string) => boolean = fileName =>
  fileName.endsWith('.csv');

const isEndWithPng: (fileName: string) => boolean = fileName =>
  fileName.endsWith('.png');

const isStringFile = isEqual('file');
const isStringDirectory = isEqual('directory');

type directoryObj = {
  name: string;
  children?: directoryObj[];
  kind: string;
  file?: File | null;
  layer: number;
};

const directoryStructure: directoryObj = {
  name: 'root',
  children: [
    {
      name: 'label.csv',
      kind: 'file',
      layer: 1,
    },
    {
      name: 'images',
      kind: 'directory',
      children: [
        {
          name: '001.png',
          kind: 'file',
          layer: 2,
        },
        {
          name: '002.png',
          kind: 'file',
          layer: 2,
        },
        {
          name: '003.png',
          kind: 'file',
          layer: 2,
        },
      ],
      layer: 1,
    },
  ],
  kind: 'directory',
  file: null,
  layer: 0,
};
const { children } = directoryStructure;

const isFile = flow([
  get('kind'), //
  isStringFile,
]);

const filterFile = filter(isFile);

const isFileCsv: (directory: directoryObj) => boolean = directory =>
  flow([
    get('name'), //
    isEndWithCsv,
  ])(directory) && isFile(directory);

const filterFileCsv = filter(isFileCsv);

const filterFilePng = filter(
  flow([
    get('name'), //
    isEndWithPng,
  ])
);

const filterDirectory = filter(
  flow([
    get('kind'), //
    isStringDirectory,
  ])
);

const isLayer = layer =>
  flow([
    get('layer'), //
    isEqual(layer),
  ]);

const isLayer1 = isLayer(1);
// const isLayer2 = isLayer(2);

const isLabelCsvExist = some(isLayer1 && isFileCsv);

const HomeFP = () => {
  return (
    <main className='map__container h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.25rem)]'>
      <div>isEndWithCsv: {`${isEndWithCsv(fileName)}`}</div>
      <div>isEndWithPng: {`${isEndWithPng(fileName)}`}</div>
      <br />
      <div>original children: {JSON.stringify(children)} </div>
      <div>
        filterFile: {`${JSON.stringify(filterFile(children?.[1].children))}`}{' '}
      </div>
      <div>filterFileCsv: {`${JSON.stringify(filterFileCsv(children))}`}</div>
      <div>filterFilePng: {`${JSON.stringify(filterFilePng(children))}`}</div>
      <div>
        filterDirectory: {`${JSON.stringify(filterDirectory(children))}`}
      </div>
      <div>
        isLabelCsvExist: {`${JSON.stringify(isLabelCsvExist(children))}`}
      </div>
    </main>
  );
};

export default HomeFP;
