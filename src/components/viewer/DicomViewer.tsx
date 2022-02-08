import React, { useEffect, useRef, useState } from "react";
// import CornerstoneViewport from "react-cornerstone-viewport";
import CornerstoneViewport from "react-cornerstone-viewport";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import StartViewer from "../start";
import DicomViewerLoader from "./DicomViewerLoader";
import cornerstone from "cornerstone-core";

import * as Styled from "./style";
import { createPartiallyEmittedExpression } from "typescript";

const DicomViewer: React.FC<{
  leftSideMenuOpened: boolean;
  rightSideMenuOpened: boolean;
}> = ({ leftSideMenuOpened, rightSideMenuOpened }) => {
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
  const { tool, viewportData } = useAppSelector((state) => state.toolType);
  const elRef = useRef(null);
  const [wc, setWc] = useState(0);
  const [ww, setWw] = useState(0);
  const [scale, setScale] = useState(0);
  const [element, setElement] = useState(null);

  const variants = {
    hidden: {
      width: "calc(100% - var(--side-menu-width)",
      transition: { ease: "easeInOut" },
    },
    // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
    visible: { width: "100%", transition: { ease: "easeInOut" } },
  };

  function handleClick() {
    setWc(Math.random() * 1000);
    setWw(Math.random() * 1000);
    setScale(Math.random());

    console.log(ww, wc, scale);
  }

  useEffect(() => {
    console.log('🍓', element)
  }, [element]);

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
            onElementEnabled={(elementEnabledEvt: any) => {
              const cornerstoneElement = elementEnabledEvt.detail.element;

              console.log(cornerstoneElement);
              setElement(cornerstoneElement);
            }}
            wc={wc}
            ww={ww}
            scale={scale}
            ref={elRef}
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
