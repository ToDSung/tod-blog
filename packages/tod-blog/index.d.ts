/* eslint-disable @typescript-eslint/no-explicit-any -- svg module shape is unknown */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}
