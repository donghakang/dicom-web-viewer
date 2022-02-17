import React from "react";
import * as Styled from "./style";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import WwwcMenu from "./WwwcMenu";
import ScaleMenu from "./ScaleMenu";
import { useSideMenuState } from "../../context/menubar/MenubarContext";
import InfoMenu from "./InfoMenu";

const variants = {
  hidden: { x: "320px", transition: { ease: "easeInOut" } },
  visible: { x: "0px", transition: { ease: "easeInOut" } },
};

const RightSideMenu: React.FC = () => {
  const { rightSideMenuOpened } = useSideMenuState();
  const toolType = useAppSelector((state) => state.toolType);

  function getToolTypeView() {
    if (toolType.tool === "Wwwc") {
      return <WwwcMenu />;
    } else if (toolType.tool === 'Info') {
      return <InfoMenu /> 
    } else {
      return <ScaleMenu />;
    }
  }

  return (
    <Styled.RightSideMenu
      variants={variants}
      initial="hidden"
      animate={rightSideMenuOpened ? "visible" : "hidden"}
    >
      {getToolTypeView()}
    </Styled.RightSideMenu>
  );
};

export default RightSideMenu;
