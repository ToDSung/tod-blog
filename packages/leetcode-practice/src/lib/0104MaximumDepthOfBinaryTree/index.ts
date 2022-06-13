import { TreeNode } from '../../structure/TreeNode';

/**
 * Definition for a binary tree node.
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
export const maxDepth: (root: TreeNode | null) => number = root => {
  // if (!root) {
  //   return 0;
  // }

  // let result = 1;
  // const search: (node: TreeNode, detph?: number) => void = (
  //   node,
  //   depth = 1
  // ) => {
  //   if (node.left) {
  //     search(node.left, depth + 1);
  //   }

  //   if (node.right) {
  //     search(node.right, depth + 1);
  //   }

  //   if (!node.left && !node.right && depth > result) {
  //     result = depth;
  //   }
  // };

  // search(root);
  // return result;

  // Time Complexity: O(n)
  // Space Complextiy: O(1)

  if (root == null) return 0;
  return Math.max(maxDepth(root.right), maxDepth(root.left)) + 1;
};
