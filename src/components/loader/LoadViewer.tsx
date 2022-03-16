import React from "react";
import { GridLoader } from "react-spinners";
import * as Styled from "./style";
import { theme } from "../../assets/styles/theme";

const LoadViewer: React.FC = () => {
  return (
    <Styled.LoadViewer>
      <div className={"grid-loader"}>
        <GridLoader size={15} margin={2} color={theme.color.primary} />
      </div>
      <div className={"loader-text"}>
        <h1>
          <span>Loading...</span>
        </h1>
      </div>
    </Styled.LoadViewer>
  );
};

export default LoadViewer;
