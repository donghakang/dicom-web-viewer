import React from "react";
import * as Styled from "./style";

import { FaLungs, FaSearch } from "react-icons/fa";
import {
  BsCircleHalf,
  BsGridFill,
  BsInfoCircleFill,
  BsArrowsMove,
  BsFillMenuButtonFill,
  BsLockFill,
  BsUnlockFill,
  BsGrid3X2GapFill,
} from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { IconContext } from "react-icons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useSideMenuDispatch } from "../../context/menubar/MenubarContext";
import { useSeriesState } from "../../context/series/SeriesContext";
import { theme } from "../../assets/styles/theme";
import ButtonComponent from "./ButtonComponent";
import GridComponent from "../gridview/GridComponent";
import {
  changeDeidentification,
  changeMode,
} from "../../redux/reducers/viewportSlice";
import CustomTooltip from "../tooltip";

const Header: React.FC<{
  useRef: React.RefObject<HTMLInputElement>;
  setTool: React.Dispatch<React.SetStateAction<string>>;
}> = ({ useRef, setTool }) => {
  const dispatch = useAppDispatch();
  const sideMenuDispatch = useSideMenuDispatch();
  const { viewport, deidentification } = useAppSelector(
    (state) => state.viewport
  );
  const images = useAppSelector((state) => state.imageLoader.images);
  const { currentSeries, series } = useSeriesState();

  function handleLoadClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (useRef.current !== null) {
      useRef.current.click();
    }
  }

  function handleToolClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string
  ) {
    setTool(type);
    if (type === "Wwwc") {
      sideMenuDispatch({ type: "RIGHT_OPEN" });
      // setRightSideMenuMode("Wwwc");
      dispatch(changeMode("Wwwc"));
    }
    if (type === "Scale") {
      sideMenuDispatch({ type: "RIGHT_OPEN" });
      // setRightSideMenuMode("Zoom");
      dispatch(changeMode("Zoom"));
    }
    if (type === "Pan") {
      sideMenuDispatch({ type: "RIGHT_CLOSE" });
      // setRightSideMenuMode(null);
      dispatch(changeMode("Pan"));
    }
    if (type === "Magnify") {
      sideMenuDispatch({ type: "RIGHT_CLOSE" });
      // setRightSideMenuMode(null);
      dispatch(changeMode("Magnify"));
    }
    if (type === "Info") {
      sideMenuDispatch({ type: "RIGHT_OPEN" });
      dispatch(changeMode("Info"));
    }
    if (type === "Private") {
      dispatch(changeDeidentification());
    }
  }

  function handleToggleLeftSideMenu() {
    sideMenuDispatch({ type: "LEFT_TRIGGER" });
  }

  function handleToggleRightSideMenu() {
    sideMenuDispatch({ type: "RIGHT_TRIGGER" });
  }

  function loadingCornerstoneViewport() {
    return images.length > 0 && series.length > 0;
  }

  function loadedHeader() {
    return (
      <ul>
        <CustomTooltip
          id="dicom"
          onClick={handleLoadClick}
          tooltip="Open DICOM folder"
          className="button-component"
          element={<FaLungs size={24} />}
        />
        <li style={{ flex: 1 }}></li>
        <ButtonComponent
          id="zoom"
          onClick={(e) => handleToolClick(e, "Scale")}
          tooltip="Zoom"
          className="button-component"
          element={<FaSearch size={24} />}
        />
        <ButtonComponent
          id="magnify"
          onClick={(e) => handleToolClick(e, "Magnify")}
          tooltip="Magnify"
          className="button-component"
          element={<FaSearch size={24} />}
        />
        <ButtonComponent
          id="pan"
          onClick={(e) => handleToolClick(e, "Pan")}
          tooltip="Pan"
          className="button-component"
          element={<BsArrowsMove size={24} />}
        />
        <ButtonComponent
          id="wwwc"
          onClick={(e) => handleToolClick(e, "Wwwc")}
          tooltip="Threshold"
          className="button-component"
          element={<BsCircleHalf size={24} />}
        />
        <ButtonComponent
          id="deidentification"
          onClick={(e) => handleToolClick(e, "Private")}
          tooltip="Deidentification"
          className="button-component"
          element={
            deidentification ? (
              <BsLockFill size={24} />
            ) : (
              <BsUnlockFill size={24} />
            )
          }
        />
        <ButtonComponent
          id="grid"
          clickTrigger
          onClick={(e) => {}}
          tooltip={<GridComponent />}
          className="button-component"
          element={<BsGrid3X2GapFill size={24} />}
        />
        <li style={{ flex: 1 }}></li>

        <ButtonComponent
          id="info"
          onClick={(e) => handleToolClick(e, "Info")}
          tooltip="Information"
          className="button-component"
          element={<BsInfoCircleFill size={24} />}
        />
      </ul>
    );
  }

  function unloadedHeader() {
    return (
      <ul>
        <CustomTooltip
          id="dicom"
          onClick={handleLoadClick}
          tooltip="Open DICOM folder"
          className="button-component"
          element={<FaLungs size={24} />}
        />
      </ul>
    );
  }

  return (
    <Styled.Header>
      <div style={{ height: "40px" }} className="button-container">
        {loadingCornerstoneViewport() ? loadedHeader() : unloadedHeader()}
      </div>
      {loadingCornerstoneViewport() && (
        <div className="menu-button-container">
          <button onClick={handleToggleLeftSideMenu}>
            <BsFillMenuButtonFill size={16} />
          </button>
          <button onClick={handleToggleRightSideMenu}>
            <BiMenuAltRight size={16} />
          </button>
        </div>
      )}
    </Styled.Header>
  );
};

export default Header;
