import React, { useEffect, useRef, useState } from "react";
// import CornerstoneViewport from "react-cornerstone-viewport";
import CornerstoneViewport from "react-cornerstone-viewport";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import StartViewer from "../start";
import DicomViewerLoader from "./DicomViewerLoader";
import cornerstone from "cornerstone-core";

import * as Styled from "./style";
import ViewportOverlay from "./ViewportOverlay";
import ImageScrollbar from "./ImageScrollbar";
import {
  changeScale,
  changeWc,
  changeWw,
  setDefaultData,
} from "../../redux/reducers/toolSlice";
import { useSideMenuState } from "../../context/menubar/MenubarContext";
import { useSeriesState } from "../../context/series/SeriesContext";
import { convertToFalseColorImage } from "cornerstone-core";
import { changeViewport } from "../../redux/reducers/viewportSlice";

const variants = {
  opened: {
    x: "var(--left-side-menu-width)",
    width:
      "calc(100% - var(--right-side-menu-width) - var(--left-side-menu-width))",
    transition: { ease: "easeInOut" },
  },
  rightOpened: {
    x: 0,
    width: "calc(100% - var(--right-side-menu-width))",
    transition: { ease: "easeInOut" },
  },
  leftOpened: {
    x: "var(--left-side-menu-width)",
    width: "calc(100% - var(--left-side-menu-width))",
    transition: { ease: "easeInOut" },
  },
  closed: { x: 0, width: "100%", transition: { ease: "easeInOut" } },
};

const DicomViewer: React.FC = () => {
  const { leftSideMenuOpened, rightSideMenuOpened } = useSideMenuState();
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
  const { viewport, row, col } = useAppSelector((state) => state.viewport);
  const { currentSeries, series } = useSeriesState();
  const dispatch = useAppDispatch();

  const [element, setElement] = useState(null);

  useEffect(() => {
    console.log(row, col, "콜록");
  }, [col, row]);

  function loadingCornerstoneViewport() {
    return images.length > 0 && series.length > 0;
  }

  function handleSelectActiveViewport(v: number) {
    dispatch(changeViewport(v));
  }

  return (
    <>
      {loadingCornerstoneViewport() ? (
        <Styled.DicomViewer
          variants={variants}
          initial="closed"
          animate={
            rightSideMenuOpened
              ? leftSideMenuOpened
                ? "opened"
                : "rightOpened"
              : leftSideMenuOpened
              ? "leftOpened"
              : "closed"
          }
          style={{
            gridTemplateColumns: `repeat(${col}, ${100 / col}%)`,
            gridTemplateRows: `repeat(${row}, ${100 / row}%)`,
          }}
        >
          {Array.apply(null, Array(row * col))
            .map(function (x, i) {
              return i;
            })
            .map((i) => (
              <CornerstoneViewport
                key={i}
                setViewportActive={() => {
                  handleSelectActiveViewport(i);
                }}
                tools={tools}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                imageIds={images
                  .filter(
                    (image) => image.series.seriesNumber === currentSeries
                  )
                  .map((image) => {
                    return image.imageId;
                  })}
                className={viewport === i ? "active" : ""}
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
            ))}
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
