import Button from '@tod-workspace/ui/components/Button';

export const metadata = {
  title: 'UI Showcase',
  description: 'Living showcase of @tod-workspace/ui components',
};

const UiShowcasePage = () => {
  return (
    <div className='flex w-full flex-col gap-8 py-8'>
      <h1 className='text-2xl font-bold'>UI Showcase</h1>
      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Button</h2>
        <div className='flex flex-wrap items-center gap-4'>
          <Button>Default</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='link'>Link</Button>
        </div>
      </section>
    </div>
  );
};

export default UiShowcasePage;
