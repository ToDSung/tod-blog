import dynamic from 'next/dynamic';

function HomeMap() {
  const Map = dynamic(() => import('@/components/Map'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  return (
    <main className='map__container h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.25rem)]'>
      <Map />
    </main>
  );
}

export default HomeMap;
