import React from "react";
import * as Styled from "./style";

import { FaLungs, FaSearch } from "react-icons/fa";
import { GrPan } from "react-icons/gr";
import { BsCircleHalf, BsGridFill } from "react-icons/bs";

import { useAppDispatch } from "../../redux/hooks";
import { changeMode } from "../../redux/reducers/toolSlice";

const Header: React.FC<{
  useRef: React.RefObject<HTMLInputElement>;
  setTool: React.Dispatch<React.SetStateAction<string>>;
  setRightSideMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setLeftSideMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  useRef,
  setTool,
  setRightSideMenuOpened,
  setLeftSideMenuOpened,
}) => {
  const dispatch = useAppDispatch();

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
      setRightSideMenuOpened(true);
      // setRightSideMenuMode("Wwwc");
      dispatch(changeMode('Wwwc'))
    }
    if (type === "Scale") {
      setRightSideMenuOpened(true);
      // setRightSideMenuMode("Zoom");
      dispatch(changeMode('Zoom'))
    }
    if (type === "Pan") {
      setRightSideMenuOpened(false);
      // setRightSideMenuMode(null);
      dispatch(changeMode('Pan'))
    }
    if (type === "Magnify") {
      setRightSideMenuOpened(false);
      // setRightSideMenuMode(null);
      dispatch(changeMode('Magnify'))
    }
  }

  function handleToggleRightSideMenu() {
    setRightSideMenuOpened((prev) => !prev);
  }

  return (
    <Styled.Header>
      <ul>
        <li>
          <button onClick={handleLoadClick}>
            <div className={"button-component"}>
              <FaLungs size={24} />
              {/* <span>Load</span> */}
            </div>
          </button>
        </li>
      </ul>
      <ul>
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

      </ul>
      <ul>
        <li>
          <button onClick={(e) => handleToolClick(e, "Wwwc")}>
            <div className={"button-component"}>
              <BsCircleHalf size={24} />
              {/* <span>Threshold</span> */}
            </div>
          </button>
        </li>
      </ul>
      <ul>
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
