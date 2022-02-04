import styled from "styled-components";

export const DicomViewer = styled.div`
  width: 100%;
    height: 100%;
`;

export const DicomViewerLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  .grid-loader {
    margin: auto;
    width: 63px;
  }

  .loader-text {
    margin-top: 8px;
    color: ${(props) => props.theme.color.loadColor1};
  }
`;

export const Viewer = styled.div`
  width: 100vw;
  height: calc(100vh - 44px);
  display: flex;
`;
