import styled from "styled-components";

export const ViewportOverlay = styled.div`
  .imageViewerViewport.empty ~ .ViewportOverlay {
    display: none;
  }
  
  color: ${({ theme }) => theme.color.primary};

  .overlay-element {
    position: absolute;
    font-weight: 400;
    text-shadow: 1px 1px #000;
    pointer-events: none;
  }
  .top-left {
    top: 20px;
    left: 20px;
  }
  .top-center {
    top: 20px;
    padding-top: 20px;
    width: 100%;
    text-align: center;
  }
  .top-right {
    top: 20px;
    right: 20px;
    text-align: right;
  }
  .bottom-left {
    bottom: 20px;
    left: 20px;
  }

  .bottom-right {
    bottom: 20px;
    right: 20px;
    text-align: right;
  }

  &.controlsVisible .topright,
  &.controlsVisible .bottomright {
    right: calc(20px + 19px);
  }

  svg {
    color: #9ccef9;
    fill: #9ccef9;
    stroke: #9ccef9;
    background-color: transparent;
    margin: 2px;
    width: 18px;
    height: 18px;
  }
`;
