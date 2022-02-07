import React, { useEffect, useState } from "react";
import Header from "../header";
import { RightSideMenu } from "../sidemenu";
import DicomViewer from "./DicomViewer";

import * as Styled from "./style";

const Viewer: React.FC<{ fileRef: React.RefObject<HTMLInputElement> }> = ({
  fileRef,
}) => {
  const [tool, setTool] = useState<string>("Pan");
  const [rightSideMenuOpened, setRightSideMenuOpened] =
    useState<boolean>(false);
  const [leftSideMenuOpened, setLeftSideMenuOpened] = useState<boolean>(false);
  const [rightSideMenuMode, setRightSideMenuMode] = useState<string | null>(
    null
  );
  const [canvasViewStyle, setCanvasViewStyle] = useState<{
    width: string;
    height: string;
    marginLeft?: string;
    marginRight?: string;
  }>({ width: "300px", height: "300px" });

  return (
    <>
      <Header
        useRef={fileRef}
        setTool={setTool}
        setRightSideMenuOpened={setRightSideMenuOpened}
        setLeftSideMenuOpened={setLeftSideMenuOpened}
        setRightSideMenuMode={setRightSideMenuMode}
      />
      <Styled.Viewer>
        <DicomViewer
          tool={tool}
          leftSideMenuOpened={leftSideMenuOpened}
          rightSideMenuOpened={rightSideMenuOpened}
        />
        <RightSideMenu open={rightSideMenuOpened} mode={rightSideMenuMode} />
      </Styled.Viewer>
    </>
  );
};

export default Viewer;
