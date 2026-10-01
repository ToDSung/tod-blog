import Button from '@tod-workspace/ui/components/Button';
import IconButton from '@tod-workspace/ui/components/IconButton';
import ThemeToggle from '@tod-workspace/ui/theme/ThemeToggle';
import { FaPalette, FaPencilAlt, FaTrash } from 'react-icons/fa';

export const metadata = {
  title: 'UI Showcase',
  description: 'Living showcase of @tod-workspace/ui components',
};

const UiShowcasePage = () => {
  return (
    <div className='flex w-full flex-col gap-8 py-8'>
      <header className='flex items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold'>UI Showcase</h1>
        <ThemeToggle />
      </header>
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
        <div className='flex flex-wrap items-center gap-4'>
          <Button size='sm'>Small</Button>
          <Button size='md'>Medium</Button>
          <Button size='lg'>Large</Button>
        </div>
      </section>
      <section className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>IconButton</h2>
        <div className='flex flex-wrap items-center gap-4'>
          <IconButton aria-label='Change theme'>
            <FaPalette />
          </IconButton>
          <IconButton aria-label='Edit' variant='outline'>
            <FaPencilAlt />
          </IconButton>
          <IconButton aria-label='Delete' variant='destructive'>
            <FaTrash />
          </IconButton>
        </div>
      </section>
    </div>
  );
};

export default UiShowcasePage;
