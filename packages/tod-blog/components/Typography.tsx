import { ReactNode } from 'react';

interface TypographyProps {
  variant?: 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle-md' | 'body-md';

  children: ReactNode;
}

const VARIANT_TO_CLASS = {
  h3: 'text-3xl',
  h4: 'text-2xl',
  h5: 'text-xl',
  h6: 'text-lg',
  'subtitle-md': 'text-md leading-6 font-medium',
  'body-md': 'text-md leading-6 font-normal',
} as const satisfies Record<
  Exclude<TypographyProps['variant'], undefined>,
  string
>;

const Typography = ({ variant = 'body-md', children }: TypographyProps) => {
  return <span className={VARIANT_TO_CLASS[variant]}>{children}</span>;
};

export default Typography;
