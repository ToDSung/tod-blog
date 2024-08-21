/* eslint-disable */
const baseConfig = require('../../jest.config.base.js');

export default {
  ...baseConfig,
  displayName: 'leetcode',
  coverageDirectory: '../../coverage/packages/leetcode',
  passWithNoTests: true,
};
