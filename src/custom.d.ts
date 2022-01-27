declare module "react-cornerstone-viewport";
declare module "cornerstone-core";
declare module "cornerstone-wado-image-loader";
declare module "cornerstone-file-image-loader"
declare module "cornerstone-web-image-loader"
declare module "cornerstone-math";
declare module "cornerstone-tools";
declare module "hammerjs";


declare module "*.svg" {
  const content: any;
  export default content;
}

declare global {
  interface Window {
    cornerstone?: any;
  }
}

declare global {
  interface Window {
    cornerstoneTools?: any;
  }
}