import React, { useState } from "react";
import CornerstoneViewport from "react-cornerstone-viewport";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ViewerLoader from "./ViewerLoader";

const Viewer: React.FC = () => {
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
  const tool = useAppSelector(state => state.tool.tool)
  const dispatch = useAppDispatch();

  console.log("REDUX", images);

  return (
    <>
      {images.length > 0 ? (
        <CornerstoneViewport
          key={0}
          tools={tools}
          style={{ minWidth: "50%", height: "512px", flex: "1" }}
          imageIds={images.map((image) => image.imageId)}
          className={"active"}
          activeTool={tool}
          loadingIndicatorComponent={ViewerLoader}
        />
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default Viewer;
