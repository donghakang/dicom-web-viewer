import React, { useEffect, useRef, useState } from "react";
import CornerstoneViewport from "react-cornerstone-viewport";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import StartViewer from "../start";
import DicomViewerLoader from "./DicomViewerLoader";
import cornerstone from "cornerstone-core";

import * as Styled from "./style";

const DicomViewer: React.FC<{
  tool: string;
  leftSideMenuOpened: boolean;
  rightSideMenuOpened: boolean;
}> = ({ tool, leftSideMenuOpened, rightSideMenuOpened }) => {
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
  const vRef = useRef(null);
  const [element, setElement] = useState(null);
  const variants = {
    hidden: {
      width: "calc(100% - var(--side-menu-width)",
      transition: { ease: "easeInOut" },
    },
    // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
    visible: { width: "100%", transition: { ease: "easeInOut" } },
  };

  useEffect(() => {
    console.log("VREF", vRef, vRef.current);
  });

  function handleClick() {
    console.log("what is going on");
    if (vRef.current !== null) {
      console.log(",,,", vRef.current);
      const viewport = cornerstone.getViewport(vRef);
      console.log(viewport.voi);
    } else {
      console.log("???", vRef.current);
    }
  }

  return (
    <>
      {images.length > 0 ? (
        <Styled.DicomViewer
          variants={variants}
          initial="visible"
          animate={rightSideMenuOpened ? "hidden" : "visible"}
        >
          <button onClick={handleClick}>PRESS HERE</button>
          <CornerstoneViewport
            key={0}
            tools={tools}
            style={{ width: "100%", height: "100%" }}
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
