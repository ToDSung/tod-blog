import { cn } from 'cn';

import type { ButtonProps } from '@tod-workspace/ui/components/Button';

import Button from '@tod-workspace/ui/components/Button';

export interface InputGroupButtonProps extends Omit<ButtonProps, 'size'> {}

const InputGroupButton = ({
  className,
  type = 'button',
  variant = 'ghost',
  ...props
}: InputGroupButtonProps) => {
  return (
    <Button
      className={cn(
        "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 shadow-none group-data-[size=lg]/input-group:h-7 group-data-[size=sm]/input-group:h-5 group-data-[size=sm]/input-group:text-[0.8rem] [&>svg:not([class*='size-'])]:size-3.5",
        className
      )}
      data-slot='input-group-button'
      type={type}
      variant={variant}
      {...props}
    />
  );
};

export default InputGroupButton;
