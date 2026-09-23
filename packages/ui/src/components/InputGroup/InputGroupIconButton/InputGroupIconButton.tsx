import { cn } from 'cn';

import type { IconButtonProps } from '@tod-workspace/ui/components/IconButton';

import IconButton from '@tod-workspace/ui/components/IconButton';

export interface InputGroupIconButtonProps extends Omit<
  IconButtonProps,
  'size'
> {}

const InputGroupIconButton = ({
  className,
  type = 'button',
  variant = 'ghost',
  ...props
}: InputGroupIconButtonProps) => {
  return (
    <IconButton
      className={cn(
        "size-6 rounded-[calc(var(--radius)-3px)] shadow-none group-data-[size=lg]/input-group:size-7 group-data-[size=sm]/input-group:size-5 [&>svg:not([class*='size-'])]:size-3.5",
        className
      )}
      data-slot='input-group-icon-button'
      type={type}
      variant={variant}
      {...props}
    />
  );
};

export default InputGroupIconButton;
