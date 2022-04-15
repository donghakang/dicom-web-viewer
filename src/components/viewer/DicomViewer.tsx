import React, { useState } from 'react';
// import CornerstoneViewport from "react-cornerstone-viewport";
import CornerstoneViewport from 'react-cornerstone-viewport';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import StartViewer from '../start';
import DicomViewerLoader from './DicomViewerLoader';

import * as Styled from './style';
import { ViewportOverlay } from 'react-cornerstone-viewport';
import ImageScrollbar from './ImageScrollbar';
import { useSideMenuState } from '../../context/menubar/MenubarContext';
import { useSeriesState } from '../../context/series/SeriesContext';
import {
  changeScale,
  changeViewport,
  changeWc,
  changeWw,
  setDefaultData,
} from '../../redux/reducers/viewportSlice';
import { useStatusState } from '../../context/status/StatusContext';
import { LoadViewer } from '../loader';

const variants = {
  opened: {
    x: 'var(--left-side-menu-width)',
    width:
      'calc(100% - var(--right-side-menu-width) - var(--left-side-menu-width))',
    transition: { ease: 'easeInOut' },
  },
  rightOpened: {
    x: 0,
    width: 'calc(100% - var(--right-side-menu-width))',
    transition: { ease: 'easeInOut' },
  },
  leftOpened: {
    x: 'var(--left-side-menu-width)',
    width: 'calc(100% - var(--left-side-menu-width))',
    transition: { ease: 'easeInOut' },
  },
  closed: { x: 0, width: '100%', transition: { ease: 'easeInOut' } },
};

const DicomViewer: React.FC<{
  fileRef: React.RefObject<HTMLInputElement>;
  folderRef: React.RefObject<HTMLInputElement>;
}> = ({ fileRef, folderRef }) => {
  const { leftSideMenuOpened, rightSideMenuOpened } = useSideMenuState();
  const [tools] = useState([
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
    {
      name: 'Magnify',
      mode: 'active',
      modeOptions: { mouseButtonMask: 1 },
    },
    // Scroll
    { name: 'StackScrollMouseWheel', mode: 'active' },
    // Touch
    { name: 'PanMultiTouch', mode: 'active' },
    { name: 'ZoomTouchPinch', mode: 'active' },
    { name: 'StackScrollMultiTouch', mode: 'active' },
  ]);

  const images = useAppSelector((state) => state.imageLoader.images);

  const { viewport, row, col, tool, viewportData, allViewport } =
    useAppSelector((state) => state.viewport);
  const { currentSeries, series } = useSeriesState();
  const { trial } = useStatusState();
  const dispatch = useAppDispatch();

  const [, setElement] = useState(null);

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
                ? 'opened'
                : 'rightOpened'
              : leftSideMenuOpened
              ? 'leftOpened'
              : 'closed'
          }
          style={{
            gridTemplateColumns: `repeat(${col}, ${100 / col}%)`,
            gridTemplateRows: `repeat(${row}, ${100 / row}%)`,
          }}
        >
          {Array(row * col)
            .fill(0)
            .map((x, i) => (
              <CornerstoneViewport
                key={i}
                setViewportActive={() => {
                  handleSelectActiveViewport(i);
                }}
                tools={tools}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                imageIds={images
                  .filter(
                    (image) => image.series.seriesNumber === currentSeries
                  )
                  .map((image) => {
                    return image.imageId;
                  })}
                className={
                  allViewport || viewport === i ? 'active viewport' : 'viewport'
                }
                activeTool={tool}
                loadingIndicatorComponent={DicomViewerLoader}
                viewportOverlayComponent={ViewportOverlay}
                scrollbarComponent={ImageScrollbar}
                onElementEnabled={(elementEnabledEvt: any) => {
                  const cornerstoneElement = elementEnabledEvt.detail.element;

                  setElement(cornerstoneElement);

                  cornerstoneElement.addEventListener(
                    'cornerstonenewimage',
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
                    'cornerstoneimagerendered',
                    (imageRenderedEvent: any) => {
                      const v = imageRenderedEvent.detail.viewport;
                      dispatch(changeScale({ viewport: i, scale: v.scale }));
                      dispatch(
                        changeWc({ viewport: i, wc: v.voi.windowCenter })
                      );
                      dispatch(
                        changeWw({ viewport: i, ww: v.voi.windowWidth })
                      );
                    }
                  );
                }}
                wc={
                  allViewport
                    ? viewportData[viewport].voi.windowCenter
                    : viewportData[i].voi.windowCenter
                }
                ww={
                  allViewport
                    ? viewportData[viewport].voi.windowWidth
                    : viewportData[i].voi.windowWidth
                }
                scale={
                  allViewport
                    ? viewportData[viewport].scale
                    : viewportData[i].scale
                }
              />
            ))}
        </Styled.DicomViewer>
      ) : (
        <>
          {trial > 0 ? (
            <LoadViewer />
          ) : (
            <StartViewer fileRef={fileRef} folderRef={folderRef} />
          )}
        </>
      )}
    </>
  );
};

export default DicomViewer;
