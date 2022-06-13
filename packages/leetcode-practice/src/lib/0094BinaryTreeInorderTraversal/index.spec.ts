import { TreeNode } from '../../structure/TreeNode';
import { inorderTraversal } from '.';

describe('0094 Binary Tree Inorder Traversal', () => {
  it('should work', () => {
    //    4
    //  2   6
    // 1 3 5 7
    const node1 = new TreeNode(1);
    const node3 = new TreeNode(3);
    const node2 = new TreeNode(2, node1, node3);

    const node5 = new TreeNode(5);
    const node7 = new TreeNode(7);
    const node6 = new TreeNode(6, node5, node7);

    const node4 = new TreeNode(4, node2, node6);

    const root = node4;
    expect(inorderTraversal(root)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
