import React from "react";
import * as Styled from "./style";

import { FaLungs, FaSearch } from "react-icons/fa";
import { GrPan } from "react-icons/gr";
import { BsCircleHalf, BsGridFill } from "react-icons/bs";

import { useAppDispatch } from "../../redux/hooks";
import { changeMode } from "../../redux/reducers/toolSlice";
import { useSideMenuDispatch } from "../../context/menubar/MenubarContext";

const Header: React.FC<{
  useRef: React.RefObject<HTMLInputElement>;
  setTool: React.Dispatch<React.SetStateAction<string>>;
}> = ({ useRef, setTool }) => {
  const dispatch = useAppDispatch();
  const sideMenuDispatch = useSideMenuDispatch();

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
  }


  function handleToggleLeftSideMenu() {
    sideMenuDispatch({ type: "LEFT_TRIGGER" });
  }

  function handleToggleRightSideMenu() {
    sideMenuDispatch({ type: "RIGHT_TRIGGER" });
  }

  return (
    <Styled.Header>
      <ul>
        <li>
          <button onClick={handleToggleLeftSideMenu}>
            <div className={"button-component"}>
              <BsGridFill size={24} />
              {/* <span>Threshold</span> */}
            </div>
          </button>
        </li>

        <li>
          <button onClick={handleLoadClick}>
            <div className={"button-component"}>
              <FaLungs size={24} />
              {/* <span>Load</span> */}
            </div>
          </button>
        </li>
        <li>
          <button onClick={(e) => handleToolClick(e, "Scale")}>
            <div className={"button-component"}>
              <FaSearch size={24} />
              {/* <span>Zoom</span> */}
            </div>
          </button>
        </li>
        <li>
          <button onClick={(e) => handleToolClick(e, "Magnify")}>
            <div className={"button-component"}>
              <FaSearch size={24} />
              {/* <span>Zoom</span> */}
            </div>
          </button>
        </li>
        <li>
          <button onClick={(e) => handleToolClick(e, "Pan")}>
            <div className={"button-component"}>
              <GrPan size={24} />
              {/* <span>Pan</span> */}
            </div>
          </button>
        </li>

        <li>
          <button onClick={(e) => handleToolClick(e, "Wwwc")}>
            <div className={"button-component"}>
              <BsCircleHalf size={24} />
              {/* <span>Threshold</span> */}
            </div>
          </button>
        </li>
        <li>
          <button onClick={(e) => console.log("grid")}>
            <div className={"button-component"}>
              <BsGridFill size={24} />
              {/* <span>Threshold</span> */}
            </div>
          </button>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={handleToggleRightSideMenu}>
            <div className={"button-component"}>
              <BsGridFill size={24} />
              {/* <span>Threshold</span> */}
            </div>
          </button>
        </li>
      </ul>
    </Styled.Header>
  );
};

export default Header;
