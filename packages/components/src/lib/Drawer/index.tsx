import { SyntheticEvent } from 'react';

type Menu = {
  value: string;
  text: string;
  children?: Menu[];
};

type Props = {
  nodes: Menu[];
  onClick: (node: Menu) => void;
  className?: string;
};

const Drawer = ({ nodes, onClick, className = '' }: Props) => {
  const handleClick = (node: Menu) => (e: SyntheticEvent) => {
    e.stopPropagation();
    onClick(node);
  };

  return (
    <>
      {nodes.map(node => {
        return (
          <div
            key={node.value}
            className={className}
            onClick={handleClick(node)}
          >
            {node.text}
            {node.children && node.children.length >= 0 && (
              <Drawer
                nodes={node.children}
                className='ml-6'
                onClick={onClick}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default Drawer;
