import Cancel from './Cancel';
import ConcatFetch from './ConcatFetch';
import ForkJoinFetch from './ForkJoinFetch';
import MergeFetch from './MergeFetch';
import MergeMapFetch from './MergeMapFetch';

const Fetch = () => {
  return (
    <main className='flex h-[calc(100vh-3.5rem)] gap-4 md:h-[calc(100vh-3.25rem)]'>
      <Cancel />
      <ConcatFetch />
      <ForkJoinFetch />
      <MergeFetch />
      <MergeMapFetch />
    </main>
  );
};

export default Fetch;
