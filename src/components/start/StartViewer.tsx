import React from "react";
import { GridLoader } from "react-spinners";
import * as Styled from "./style";
import { theme } from "../../assets/styles/theme";

const StartViewer: React.FC<{ useRef: React.RefObject<HTMLInputElement> }> = ({
  useRef,
}) => {
  function handleLoadClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (useRef.current !== null) {
      useRef.current.click();
    }
  }

  return (
    <Styled.StartViewer onClick={handleLoadClick}>
      <div className="container">
        <div className={"grid-loader"}>
          <GridLoader size={15} margin={2} color={theme.color.primary} />
        </div>
        <div className={"loader-text"}>
          <h1>
            Welcome to <span>DICOM</span> Viewer
          </h1>
          <span>Press Lung button on the top right to open DICOM folder</span>
        </div>
      </div>
    </Styled.StartViewer>
  );
};

export default StartViewer;
