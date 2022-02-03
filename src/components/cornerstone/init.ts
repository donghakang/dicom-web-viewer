import dicomParser from "dicom-parser";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneFileImageLoader from "cornerstone-file-image-loader"
import cornerstoneWebImageLoader from "cornerstone-web-image-loader"
import Hammer from "hammerjs";

export default function initCornerstone() {
  // Cornertone Tools

  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneFileImageLoader.external.cornerstone = cornerstone;
  cornerstoneWebImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.init({
    globalToolSyncEnabled: true,
  });

  
}
