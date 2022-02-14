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
import ViewportOverlay from "./ViewportOverlay";
import ImageScrollbar from "./ImageScrollbar";
import { changeScale, changeWc, changeWw, setDefaultData } from "../../redux/reducers/toolSlice";

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
    {
      name: "Magnify",
      mode: "active",
      modeOptions: { mouseButtonMask: 1 },
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
  const dispatch = useAppDispatch();

  const [element, setElement] = useState(null);

  const variants = {
    hidden: {
      width: "calc(100% - var(--side-menu-width)",
      transition: { ease: "easeInOut" },
    },
    // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
    visible: { width: "100%", transition: { ease: "easeInOut" } },
  };


  return (
    <>
      {images.length > 0 ? (
        <Styled.DicomViewer
          variants={variants}
          initial="visible"
          animate={rightSideMenuOpened ? "hidden" : "visible"}
        >
          <CornerstoneViewport
            key={0}
            tools={tools}
            style={{ width: "100%", height: "100%" }}
            imageIds={images.map((image) => image.imageId)}
            className={"active"}
            activeTool={tool}
            loadingIndicatorComponent={DicomViewerLoader}
            viewportOverlayComponent={ViewportOverlay}
            scrollbarComponent={ImageScrollbar}
            onElementEnabled={(elementEnabledEvt: any) => {
              const cornerstoneElement = elementEnabledEvt.detail.element;

              setElement(cornerstoneElement);

              cornerstoneElement.addEventListener(
                "cornerstonenewimage",
                (NewImageEvent: any) => {
                  const viewport = NewImageEvent.detail.image;
                  // set default window center, window width
                  console.log('🚀', viewport)
                  dispatch(
                    setDefaultData({
                      windowCenter: viewport.windowCenter,
                      windowWidth: viewport.windowWidth,
                    })
                  );
                }
              );

              cornerstoneElement.addEventListener(
                "cornerstoneimagerendered",
                (imageRenderedEvent: any) => {
                  const viewport = imageRenderedEvent.detail.viewport;
                  dispatch(changeScale(viewport.scale));
                  dispatch(changeWc(viewport.voi.windowCenter));
                  dispatch(changeWw(viewport.voi.windowWidth));
                }
              );
            }}
            wc={viewportData.voi.windowCenter}
            ww={viewportData.voi.windowWidth}
            scale={viewportData.scale}
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
