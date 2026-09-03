import { cva } from 'class-variance-authority';

import type { ButtonProps } from '@tod-workspace/ui/components/Button';

import Button from '@tod-workspace/ui/components/Button';
import { cn } from '@tod-workspace/ui/lib/utils';

export const iconButtonVariants = cva('p-0', {
  variants: {
    size: {
      sm: 'size-7',
      md: 'size-8',
      lg: 'size-9',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface IconButtonProps extends ButtonProps {
  'aria-label': string;
}

const IconButton = ({ className, size = 'md', ...props }: IconButtonProps) => {
  return (
    <Button
      className={cn(iconButtonVariants({ size }), className)}
      data-slot='icon-button'
      size={size}
      {...props}
    />
  );
};

export default IconButton;
