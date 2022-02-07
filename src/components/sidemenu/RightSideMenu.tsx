import React from "react";
import * as Styled from "./style";
import * as cornerstone from 'cornerstone-core'

interface RightSideMenuInterface {
  open: boolean;
  mode: string | null;
}

const variants = {
  hidden: { x: "320px" , transition: { ease: "easeInOut" }  },
  // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
  visible: { x: "0px", transition: { ease: "easeInOut" } },
};

const RightSideMenu: React.FC<RightSideMenuInterface> = ({ open, mode }) => {

  return (
    <Styled.RightSideMenu
      variants={variants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
    >
      {open ? "true" : "false"}
      {mode}
    </Styled.RightSideMenu>
  );
};

export default RightSideMenu;
