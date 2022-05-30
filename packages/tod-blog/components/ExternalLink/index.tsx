import { FC, ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
};

const ExternalLink: FC<Props> = ({ href, children }) => (
  <a href={href} target='_blank' rel='noopener noreferrer'>
    {children}
  </a>
);

export default ExternalLink;
