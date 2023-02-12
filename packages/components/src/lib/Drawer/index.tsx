import { SyntheticEvent } from 'react';

export type Menu = {
  value?: string;
  text: string;
  children?: Menu[];
};

type DrawerProps = {
  nodes: Menu[];
  onClick: (node: Menu) => void;
  className?: string;
};

const Drawer = ({ nodes, onClick, className = '' }: DrawerProps) => {
  const handleClick = (node: Menu) => (e: SyntheticEvent) => {
    if (!node.value) return;
    e.stopPropagation();
    onClick(node);
  };

  return (
    <div className='px-2 py-4'>
      {nodes.map(node => {
        return (
          <div
            key={node.value}
            className={`${className} py-1`}
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
    </div>
  );
};

export default Drawer;
