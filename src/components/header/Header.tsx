import React from "react";
import * as Styled from "./style";

import { FaLungs, FaSearch } from "react-icons/fa";
import {
  BsCircleHalf,
  BsGridFill,
  BsInfoCircleFill,
  BsArrowsMove,
  BsFillMenuButtonFill,
} from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { IconContext } from "react-icons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeMode } from "../../redux/reducers/toolSlice";
import { useSideMenuDispatch } from "../../context/menubar/MenubarContext";
import { useSeriesState } from "../../context/series/SeriesContext";
import { theme } from "../../assets/styles/theme";
import ButtonComponent from "./ButtonComponent";
import GridComponent from "../gridview/GridComponent";

const Header: React.FC<{
  useRef: React.RefObject<HTMLInputElement>;
  setTool: React.Dispatch<React.SetStateAction<string>>;
}> = ({ useRef, setTool }) => {
  const dispatch = useAppDispatch();
  const sideMenuDispatch = useSideMenuDispatch();
  const images = useAppSelector((state) => state.imageLoader.images);
  const { currentSeries, series } = useSeriesState();

  function handleLoadClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (useRef.current !== null) {
      console.log(useRef);
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
        <ButtonComponent
          onClick={handleLoadClick}
          tooltip="Open Dicom folder"
          className="button-component"
          element={<FaLungs size={24} />}
        />
        <ButtonComponent
          onClick={(e) => handleToolClick(e, "Scale")}
          tooltip="Zoom"
          className="button-component"
          element={<FaSearch size={24} />}
        />
        <ButtonComponent
          onClick={(e) => handleToolClick(e, "Magnify")}
          tooltip="Magnify"
          className="button-component"
          element={<FaSearch size={24} />}
        />
        <ButtonComponent
          onClick={(e) => handleToolClick(e, "Pan")}
          tooltip="Pan"
          className="button-component"
          element={<BsArrowsMove size={24} />}
        />
        <ButtonComponent
          onClick={(e) => handleToolClick(e, "Wwwc")}
          tooltip="Threshold"
          className="button-component"
          element={<BsCircleHalf size={24} />}
        />
        <ButtonComponent
          clickTrigger
          onClick={(e) => console.log("e!!")}
          tooltip={<GridComponent/>}
          className="button-component"
          element={<BsInfoCircleFill size={24} />}
        />
        <ButtonComponent
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
        <ButtonComponent
          onClick={handleLoadClick}
          tooltip="Open Dicom folder"
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
