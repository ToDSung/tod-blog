/* eslint-disable @typescript-eslint/no-require-imports -- jest.config.base.js is CommonJS */
const baseConfig = require('../../jest.config.base.js');

export default {
  ...baseConfig,
  displayName: 'leetcode',
  coverageDirectory: '../../coverage/packages/leetcode',
  passWithNoTests: false,
};
