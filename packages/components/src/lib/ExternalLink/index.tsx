import { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
};

const ExternalLink = ({ href, children }: Props) => (
  <a href={href} target='_blank' rel='noopener noreferrer'>
    {children}
  </a>
);

export default ExternalLink;
