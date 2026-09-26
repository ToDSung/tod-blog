import { cn } from 'cn';

import type { InputProps } from '@tod-workspace/ui/components/Input';

import Input from '@tod-workspace/ui/components/Input';

export interface InputGroupInputProps extends Omit<InputProps, 'size'> {}

const InputGroupInput = ({ className, ...props }: InputGroupInputProps) => {
  return (
    <Input
      className={cn(
        'h-full min-w-0 flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 read-only:bg-transparent focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 md:group-data-[size=sm]/input-group:text-[0.8rem] dark:bg-transparent dark:read-only:bg-transparent dark:disabled:bg-transparent',
        className
      )}
      data-slot='input-group-control'
      {...props}
    />
  );
};

export default InputGroupInput;
