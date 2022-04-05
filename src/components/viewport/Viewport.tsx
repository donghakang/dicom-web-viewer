import React, { useRef, useState } from "react";
import CornerstoneViewport from "react-cornerstone-viewport";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

const Viewport: React.FC = () => {
  const tools = [
    // Mouse
    {
      name: 'Wwwc',
      mode: 'active',
      modeOptions: { mouseButtonMask: 1 },
    },
    {
      name: 'Zoom',
      mode: 'active',
      modeOptions: { mouseButtonMask: 2 },
    },
    {
      name: 'Pan',
      mode: 'active',
      modeOptions: { mouseButtonMask: 4 },
    },
    // Scroll
    { name: 'StackScrollMouseWheel', mode: 'active' },
    // Touch
    { name: 'PanMultiTouch', mode: 'active' },
    { name: 'ZoomTouchPinch', mode: 'active' },
    { name: 'StackScrollMultiTouch', mode: 'active' },
  ];
  const imageIds = [
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
    'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm',
  ];
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);

  function handleOpenFolder(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      // 하나도 선택되지 않는다면, file들을 변경시키지 않는다.
      if (e.target.files.length > 0) {
        console.log(e.target.files[0]);

        const singleFile = e.target.files[0];

        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(
          singleFile
        );

        const image = cornerstoneWADOImageLoader.wadouri.loadFileRequest(
          imageId
        );

        console.log(image);

        setFile(imageId);
      }
    }
  }
  return (
    <>
      {file ? (
        <CornerstoneViewport
          tools={tools}
          imageIds={[file]}
          style={{ minWidth: '100%', height: '512px', flex: 1 }}
        />
      ) : (
        <></>
      )}
      <input ref={fileRef} type="file" onChange={handleOpenFolder} />
    </>
  );
};

export default Viewport;
