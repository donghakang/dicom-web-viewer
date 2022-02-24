import styled from "styled-components";
import { motion } from "framer-motion";
export const Viewer = styled.div`
  width: 100%;
  height: calc(100vh - var(--header-height));
  display: flex;
`;

export const DicomViewer = styled(motion.div)`
  display: grid;

  .active {
    border: 3px solid green;
  }
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
    color: ${(props) => props.theme.color.primary};
  }
`;
