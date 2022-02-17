import React, { useEffect } from "react";
import * as Styled from "./style";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CornerstoneViewport from "react-cornerstone-viewport";
import DicomViewerLoader from "../viewer/DicomViewerLoader";
import { ViewportOverlayInterface } from "../viewer/ViewportOverlay/ViewportOverlay";
import { useSideMenuState } from "../../context/menubar/MenubarContext";
import { useSeriesState } from "../../context/series/SeriesContext";
import SeriesComponent from "./SeriesMenu/SeriesComponent";

const variants = {
  hidden: { x: "-320px", transition: { ease: "easeInOut" } },
  // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
  visible: { x: "0px", transition: { ease: "easeInOut" } },
};

const LeftSideMenu: React.FC = () => {
  const { leftSideMenuOpened } = useSideMenuState();
  const { currentSeries, series } = useSeriesState();
  const toolType = useAppSelector((state) => state.toolType);
  const images = useAppSelector((state) => state.imageLoader.images);

  return (
    <Styled.LeftSideMenu
      variants={variants}
      initial="hidden"
      animate={leftSideMenuOpened ? "visible" : "hidden"}
    >
      {images.length > 0 ? (
        series.map((seriesInfo) => (
          <SeriesComponent
            key={seriesInfo.seriesNumber}
            seriesInfo={seriesInfo}
          />
        ))
      ) : (
        <div>???</div>
      )}
    </Styled.LeftSideMenu>
  );
};

export default LeftSideMenu;
