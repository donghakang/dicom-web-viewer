import React, { useCallback, useEffect, useState } from "react";
import Header from "../header";
import { RightSideMenu, LeftSideMenu } from "../sidemenu";
import { useSideMenuDispatch } from "../../context/menubar/MenubarContext";

import DicomViewer from "./DicomViewer";

import * as Styled from "./style";
import { useAppDispatch } from "../../redux/hooks";
import {
  allViewportOff,
  allViewportOn,
  changeDeidentification,
  changeMode,
} from "../../redux/reducers/viewportSlice";

const Viewer: React.FC<{ fileRef: React.RefObject<HTMLInputElement> }> = ({
  fileRef,
}) => {
  const [tool, setTool] = useState<string>("Pan");
  const dispatch = useAppDispatch();
  const sideMenuDispatch = useSideMenuDispatch();

  // hot key setup
  const handleKeyPress = useCallback((event) => {
    console.log(`Key pressed: ${event.key}`);
    switch (event.key) {
      case "Shift":
        dispatch(allViewportOn());
        break;
      case "s":
        // scale hot key
        sideMenuDispatch({ type: "RIGHT_OPEN" });
        dispatch(changeMode("Zoom"));
        break;
      case "m":
        // pan
        sideMenuDispatch({ type: "RIGHT_CLOSE" });
        dispatch(changeMode("Pan"));
        break;
      case "t":
        // threshold
        sideMenuDispatch({ type: "RIGHT_OPEN" });
        dispatch(changeMode("Wwwc"));
        break;
      case "z":
        // Magnify
        sideMenuDispatch({ type: "RIGHT_CLOSE" });
        dispatch(changeMode("Magnify"));
        break;
      case "i":
        // Info
        sideMenuDispatch({ type: "RIGHT_OPEN" });
        dispatch(changeMode("Info"));
        break;
      case "l":
        // Lock
        sideMenuDispatch({ type: "RIGHT_CLOSE" });
        dispatch(changeDeidentification());
        break;
    }
  }, []);

  const handleKeyRelease = useCallback((event) => {
    console.log(`Key released: ${event.key}`);
    switch (event.key) {
      case "Shift":
        dispatch(allViewportOff());
        break;
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);
    
    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyRelease);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Header useRef={fileRef} setTool={setTool} />
      <Styled.Viewer>
        <LeftSideMenu />
        <DicomViewer />
        <RightSideMenu />
      </Styled.Viewer>
    </>
  );
};

export default Viewer;
