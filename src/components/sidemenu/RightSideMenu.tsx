import React from "react";
import * as Styled from "./style";
import * as cornerstone from "cornerstone-core";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import WwwcMenu from "./WwwcMenu";
import ScaleMenu from "./ScaleMenu";

interface RightSideMenuInterface {
  open: boolean;
}

const variants = {
  hidden: { x: "320px", transition: { ease: "easeInOut" } },
  // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
  visible: { x: "0px", transition: { ease: "easeInOut" } },
};

const RightSideMenu: React.FC<RightSideMenuInterface> = ({ open }) => {
  const toolType = useAppSelector((state) => state.toolType);

  function getToolTypeView() {
    if (toolType.tool === "Wwwc") {
      return <WwwcMenu />;
    } else {
      return <ScaleMenu />;
    }
  }

  return (
    <Styled.RightSideMenu
      variants={variants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
    >
      {getToolTypeView()}
    </Styled.RightSideMenu>
  );
};

export default RightSideMenu;
