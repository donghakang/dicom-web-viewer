import React from "react";
import * as Styled from "./style";

interface RightSideMenuInterface {
  open: boolean;
}

const variants = {
  hidden: { x: "100vw" },
  // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
  visible: { x: "calc(100vw - 320px)" },
};

const RightSideMenu: React.FC<RightSideMenuInterface> = ({ open }) => {
  return <Styled.RightSideMenu>{open ? "true" : "false"}</Styled.RightSideMenu>;
};

export default RightSideMenu;
