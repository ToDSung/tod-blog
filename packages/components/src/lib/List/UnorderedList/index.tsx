type Props = {
  items: string[];
  className?: string;
  liProps?: {
    className?: string;
  };
};

const UnorderedList = ({ items, className, liProps = {} }: Props) => (
  <ul className={`ul sm:list-disc ${className}`}>
    {items.map((item, index) => (
      <li className={`li leading-7 ${liProps?.className ?? ''}`} key={index}>
        {item}
      </li>
    ))}
  </ul>
);

export default UnorderedList;
