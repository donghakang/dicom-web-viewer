import React from "react";
import { GridLoader } from "react-spinners";
import * as Styled from "./style";
import { theme } from '../../assets/styles/theme'

function DicomViewerLoader() {
  return (
    <Styled.DicomViewerLoader>
      <div className={"grid-loader"}>
        <GridLoader size={15} margin={2} color={theme.color.loadColor1} />
      </div>
      <div className={"loader-text"}>Loading ...</div>
    </Styled.DicomViewerLoader>
  );
}

export default DicomViewerLoader;
