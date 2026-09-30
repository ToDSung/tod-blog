'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

import type { CSSProperties } from 'react';
import type { ToasterProps as SonnerProps } from 'sonner';

// Consumers must call the same sonner copy the Toaster listens to.
export { toast } from 'sonner';

export interface ToasterProps extends SonnerProps {}

const Toaster = (props: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      icons={{
        success: <CircleCheckIcon className='size-4' />,
        info: <InfoIcon className='size-4' />,
        warning: <TriangleAlertIcon className='size-4' />,
        error: <OctagonXIcon className='size-4' />,
        loading: <Loader2Icon className='size-4 animate-spin' />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border':
            'color-mix(in oklab, var(--foreground) 10%, transparent)',
          '--border-radius': 'var(--radius)',
        } as CSSProperties
      }
      theme={theme as SonnerProps['theme']}
      toastOptions={{
        // sonner's unlayered stylesheet outranks layered utilities unless they are important.
        classNames: { description: 'text-muted-foreground!' },
      }}
      {...props}
    />
  );
};

export default Toaster;
