/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
export const solution = function (isBadVersion: (n: number) => boolean) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n: number) {
    // binary search
    let left = 1,
      right = n;
    while (left < right) {
      // prevent overflow
      const mid = Math.floor(left + (right - left) / 2);
      if (isBadVersion(mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  };
};
