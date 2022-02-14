import React from "react";
import * as Styled from "./style";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CornerstoneViewport from "react-cornerstone-viewport";
import DicomViewerLoader from "../viewer/DicomViewerLoader";
import { ViewportOverlayInterface } from "../viewer/ViewportOverlay/ViewportOverlay";

interface LeftSideMenuInterface {
  open: boolean;
}

const variants = {
  hidden: { x: "320px", transition: { ease: "easeInOut" } },
  // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
  visible: { x: "0px", transition: { ease: "easeInOut" } },
};

const LeftSideMenu: React.FC<LeftSideMenuInterface> = ({ open }) => {
  const toolType = useAppSelector((state) => state.toolType);
  const images = useAppSelector((state) => state.imageLoader.images);

  console.log(images.length > 0 ? [images[10].imageId] : []);

  return (
    <Styled.LeftSideMenu
      variants={variants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
    >
      {images.length > 0 ? (
        <div  style={{ width: "280px", height: "200px", borderRadius: "10px" }}>
          <CornerstoneViewport
            key={0}
            style={{ width: "100%", height: "100%" }}
            imageIds={[images[0].imageId]}
            tools={[]}
            viewportOverlayComponent={(props: ViewportOverlayInterface) => (<></>)}
          />
        </div>
      ) : (
        <div>???</div>
      )}
    </Styled.LeftSideMenu>
  );
};

export default LeftSideMenu;
