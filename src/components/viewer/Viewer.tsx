import React, { useState } from "react";
import Header from "../header";
import { RightSideMenu } from "../sidemenu";
import DicomViewer from "./DicomViewer";

import * as Styled from "./style";

const Viewer: React.FC<{ fileRef: React.RefObject<HTMLInputElement> }> = ({
  fileRef,
}) => {
  const [tool, setTool] = useState<string>("Pan");
  const [rightSideMenuOpened, setRightSideMenuOpened] = useState(false);
  const [leftSideMenuOpened, setLeftSideMenuOpened] = useState(false);

  return (
    <>
      <Header
        useRef={fileRef}
        setTool={setTool}
        setRightSideMenuOpened={setRightSideMenuOpened}
        setLeftSideMenuOpened={setLeftSideMenuOpened}
      />
      <Styled.Viewer>
        <DicomViewer tool={tool} />
        <RightSideMenu open={rightSideMenuOpened} />
      </Styled.Viewer>
    </>
  );
};

export default Viewer;
