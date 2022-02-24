// Grid View
// 헤더에서 Grid를 정할때 보여지는 component
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  changeViewport,
  changeViewportArrange,
} from "../../redux/reducers/viewportSlice";
import * as Styled from "./style";

const GridComponent = () => {
  const dispatch = useAppDispatch();
  const [hoveredViewport, setHoveredViewport] = useState<number[]>([]);

  function setHovered(viewports: number[]) {
    setHoveredViewport(viewports);
  }

  function handleClick(v: number) {
    dispatch(changeViewport(v));

    switch (v) {
      case 0:
        dispatch(changeViewportArrange({ row: 1, col: 1 }));
        break;
      case 1:
        dispatch(changeViewportArrange({ row: 1, col: 2 }));
        break;

      case 2:
        dispatch(changeViewportArrange({ row: 1, col: 3 }));
        break;

      case 3:
        dispatch(changeViewportArrange({ row: 2, col: 1 }));
        break;

      case 4:
        dispatch(changeViewportArrange({ row: 2, col: 2 }));
        break;

      case 5:
        dispatch(changeViewportArrange({ row: 2, col: 3 }));
        break;

      default:
        break;
    }
  }

  return (
    <Styled.GridComponent>
      <div className="grid-row">
        <div
          className="grid-col"
          onMouseOver={() => setHovered([0])}
          onClick={() => handleClick(0)}
          style={{
            backgroundColor: `${hoveredViewport.includes(0) ? "#fff" : "#999"}`,
          }}
        ></div>
        <div
          className="grid-col"
          onMouseOver={() => setHovered([0, 1])}
          onClick={() => handleClick(1)}
          style={{
            backgroundColor: `${hoveredViewport.includes(1) ? "#fff" : "#999"}`,
          }}
        ></div>
        <div
          className="grid-col"
          onMouseOver={() => setHovered([0, 1, 2])}
          onClick={() => handleClick(2)}
          style={{
            backgroundColor: `${hoveredViewport.includes(2) ? "#fff" : "#999"}`,
          }}
        ></div>
      </div>
      <div className="grid-row">
        <div
          className="grid-col"
          onMouseOver={() => setHovered([0, 3])}
          onClick={() => handleClick(3)}
          style={{
            backgroundColor: `${hoveredViewport.includes(3) ? "#fff" : "#999"}`,
          }}
        ></div>
        <div
          className="grid-col"
          onMouseOver={() => setHovered([0, 1, 3, 4])}
          onClick={() => handleClick(4)}
          style={{
            backgroundColor: `${hoveredViewport.includes(4) ? "#fff" : "#999"}`,
          }}
        ></div>
        <div
          className="grid-col"
          onMouseOver={() => setHovered([0, 1, 2, 3, 4, 5])}
          onClick={() => handleClick(5)}
          style={{
            backgroundColor: `${hoveredViewport.includes(5) ? "#fff" : "#999"}`,
          }}
        ></div>
      </div>
    </Styled.GridComponent>
  );
};

export default GridComponent;
