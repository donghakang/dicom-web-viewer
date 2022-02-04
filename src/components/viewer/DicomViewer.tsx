import React, { useState } from "react";
import CornerstoneViewport from "react-cornerstone-viewport";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import StartViewer from "../start";
import DicomViewerLoader from "./DicomViewerLoader";

import * as Styled from "./style";

const DicomViewer: React.FC<{ tool: string }> = ({ tool }) => {
  const [tools, setTools] = useState([
    // Mouse
    {
      name: "Wwwc",
      mode: "active",
      modeOptions: { mouseButtonMask: 1 },
    },
    {
      name: "Zoom",
      mode: "active",
      modeOptions: { mouseButtonMask: 2 },
    },
    {
      name: "Pan",
      mode: "active",
      modeOptions: { mouseButtonMask: 4 },
    },
    // Scroll
    { name: "StackScrollMouseWheel", mode: "active" },
    // Touch
    { name: "PanMultiTouch", mode: "active" },
    { name: "ZoomTouchPinch", mode: "active" },
    { name: "StackScrollMultiTouch", mode: "active" },
  ]);


  const images = useAppSelector((state) => state.imageLoader.images);  
  const dispatch = useAppDispatch();

  return (
    <>
      {images.length > 0 ? (
        <Styled.DicomViewer>
          <CornerstoneViewport
            key={0}
            tools={tools}
            style={{ minWidth: "50%", height: "100%"}}
            imageIds={images.map((image) => image.imageId)}
            className={"active"}
            activeTool={tool}
            loadingIndicatorComponent={DicomViewerLoader}
          />
        </Styled.DicomViewer>
      ) : (
        <>
          <StartViewer />
        </>
      )}
    </>
  );
};

export default DicomViewer;
