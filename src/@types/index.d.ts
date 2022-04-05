
declare module "dicom-parser";
declare module "cornerstone-core";
declare module "cornerstone-wado-image-loader";
declare module "cornerstone-math";
declare module "cornerstone-tools";
declare module "hammerjs";

declare module "react-cornerstone-viewport";
declare module 'dcmjs';

declare global {
    interface Window {
        cornerstoneTools:any;
    }
}