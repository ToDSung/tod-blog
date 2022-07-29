import { FC } from 'react';

type Props = {
  items: string[];
  className?: string;
  liProps?: {
    className: string;
  };
};

const UnorderedList: FC<Props> = ({ items, className, liProps = {} }) => (
  <ul className={`ul sm:list-disc ${className}`}>
    {items.map((item, index) => (
      <li className={`li leading-7 ${liProps?.className ?? ''}`} key={index}>
        {item}
      </li>
    ))}
  </ul>
);

export default UnorderedList;
