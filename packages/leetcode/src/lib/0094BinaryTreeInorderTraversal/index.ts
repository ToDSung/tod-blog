import { TreeNode } from '../../structure/TreeNode';

/**
 * Definition for a binary tree node.
 */

// 先拜訪左子節點，再拜訪父節點，最後拜訪右子節點
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
export const inorderTraversal: (root: TreeNode) => number[] = root => {
  // const result = [];

  // const recurse = root => {
  //   if (!root) return;
  //   recurse(root.left);
  //   result.push(root.val);
  //   recurse(root.right);
  // };
  // recurse(root);
  // return result;

  const result = [];
  const stack: TreeNode[] = [];
  let curr: TreeNode | undefined | null = root;

  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();
    if (curr) {
      result.push(curr.val);
      curr = curr.right;
    }
  }

  return result;
};
