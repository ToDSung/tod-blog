interface UnorderedListProps {
  items: string[];
  className?: string;
  liProps?: {
    className?: string;
  };
}

const UnorderedList = ({
  items,
  className,
  liProps = {},
}: UnorderedListProps) => (
  <ul className={`list-disc ${className}`}>
    {items.map((item, index) => (
      <li className={`leading-7 ${liProps?.className ?? ''}`} key={index}>
        {item}
      </li>
    ))}
  </ul>
);

export default UnorderedList;
