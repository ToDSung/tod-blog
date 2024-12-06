'use client';

import Typography from '@/components/Typography';

import JotaiUserName from '../jotai-example/UserName';
import RecoilUserName from '../recoil-example/UserName';
import ReduxUserName from '../redux-example/UserName';
import ZustandReactUserName from '../zustand-example/react/UserName';
import ZustandVanillaUserName from '../zustand-example/vanilla/UserName';

const AllUserName = () => {
  return (
    <div className='my-4 flex flex-col gap-4'>
      <Typography>Jotai</Typography>
      <JotaiUserName />
      <Typography>Recoil</Typography>
      <RecoilUserName />
      <Typography>Redux</Typography>
      <ReduxUserName />
      <Typography>Zustand React</Typography>
      <ZustandReactUserName />
      <Typography>Zustand Vanilla</Typography>
      <ZustandVanillaUserName />
    </div>
  );
};

export default AllUserName;
