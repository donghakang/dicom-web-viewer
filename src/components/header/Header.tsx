import React from "react";
import * as Styled from "./style/Header.styled";
import { FaLungs, FaSearch } from "react-icons/fa";
import { GrPan } from "react-icons/gr";
import { BsCircleHalf } from "react-icons/bs";
import { useAppDispatch } from "../../redux/hooks";
import { setTool } from "../../redux/reducers/toolSlice";

const Header: React.FC<{ useRef: React.RefObject<HTMLInputElement> }> = ({
    useRef,
}) => {
  const  dispatch = useAppDispatch()
  // TODO: 불러오기, PAN, Zoom, Threshold
  const tools = [
    {
      name: "Pan",
      mode: "active",
      modeOptions: { mouseButtonMask: 1 },
    },
    {
      name: "Zoom",
      mode: "active",
      modeOptions: { mouseButtonMask: 2 },
    },
    {
      name: "Wwwc",
      mode: "active",
      modeOptions: { mouseButtonMask: 4 },
    },
  ];

  function handleLoadClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
      if (useRef.current !== null) {
          console.log(useRef)
          useRef.current.click()
      }
  }

  function handleToolClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string
  ) {
    console.log(type);
    dispatch(setTool(type))
  }

  return (
    <Styled.Header>
      <button onClick={handleLoadClick}>
        <div className={"button-component"}>
          <FaLungs size={24} />
          {/* <span>Load</span> */}
        </div>
      </button>
      <button onClick={(e) => handleToolClick(e, "Zoom")}>
        <div className={"button-component"}>
          <FaSearch size={24} />
          {/* <span>Zoom</span> */}
        </div>
      </button>
      <button onClick={(e) => handleToolClick(e, "Pan")}>
        <div className={"button-component"}>
          <GrPan size={24} />
          {/* <span>Pan</span> */}
        </div>
      </button>
      <button onClick={(e) => handleToolClick(e, "Wwwc")}>
        <div className={"button-component"}>
          <BsCircleHalf size={24} />
          {/* <span>Threshold</span> */}
        </div>
      </button>
    </Styled.Header>
  );
};

export default Header;
