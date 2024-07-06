import { ReactNode } from 'react';

type ParagraphProps = {
  text?: string;
  className?: string;
  children?: ReactNode;
};

const Paragraph = ({ text, className, children }: ParagraphProps) => (
  <p className={`indent-4 leading-7 ${className}`}>{text || children}</p>
);

export default Paragraph;
