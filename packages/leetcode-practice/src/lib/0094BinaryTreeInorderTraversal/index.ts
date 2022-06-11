/**
 * Definition for a binary tree node.
 */

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number, left?: TreeNode, right?: TreeNode) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

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
