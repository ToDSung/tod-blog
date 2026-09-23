import { cn } from 'cn';

import type { LabelProps } from '@tod-workspace/ui/components/Label';

import Label from '@tod-workspace/ui/components/Label';

export interface FieldLabelProps extends LabelProps {}

const FieldLabel = ({ className, ...props }: FieldLabelProps) => {
  return (
    <Label
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
        className
      )}
      data-slot='field-label'
      {...props}
    />
  );
};

export default FieldLabel;
