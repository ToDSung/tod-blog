import { ReactNode } from 'react';

type Props = {
  text?: string;
  className?: string;
  children?: ReactNode;
};

const Paragraph = ({ text, className, children }: Props) => (
  <p className={`indent-8 leading-7 ${className}`}>{text || children}</p>
);

export default Paragraph;
