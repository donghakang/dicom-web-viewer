import React, { useEffect, useState } from "react";
import Header from "../header";
import { RightSideMenu, LeftSideMenu } from "../sidemenu";
import { MenubarProvider } from "../../context/menubar/MenubarContext";
import DicomViewer from "./DicomViewer";

import * as Styled from "./style";
import { SeriesProvider } from "../../context/series/SeriesContext";

const Viewer: React.FC<{ fileRef: React.RefObject<HTMLInputElement> }> = ({
  fileRef,
}) => {
  const [tool, setTool] = useState<string>("Pan");

  return (
    <MenubarProvider>
      <Header useRef={fileRef} setTool={setTool} />
      <Styled.Viewer>
        <LeftSideMenu />
        <DicomViewer />
        <RightSideMenu />
      </Styled.Viewer>
    </MenubarProvider>
  );
};

export default Viewer;
