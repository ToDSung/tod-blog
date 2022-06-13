import { TreeNode } from '../../structure/TreeNode';
import { maxDepth } from '.';

describe('0104 Maximum Depth of Binary Tree', () => {
  it('should work', () => {
    //    3
    //  9   20
    //    15  7
    const node9 = new TreeNode(9);

    const node15 = new TreeNode(15);
    const node7 = new TreeNode(7);
    const node20 = new TreeNode(2, node15, node7);

    const node3 = new TreeNode(3, node9, node20);

    expect(maxDepth(null)).toEqual(0);
    expect(maxDepth(node3)).toEqual(3);
  });
});
