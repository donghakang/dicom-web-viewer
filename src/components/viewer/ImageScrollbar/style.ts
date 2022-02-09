import styled from "styled-components";

export const ImageScrollbar = styled.div`
  height: 100%;
  padding: 5px;
  position: absolute;
  right: 0;
  top: 0;

  .scroll-holder {
    height: calc(100% - 20px);
    margin-top: 5px;
    position: relative;
    width: 12px;
  }
  .scroll-holder .imageSlider {
    height: 12px;
    left: 12px;
    padding: 0;
    position: absolute;
    top: 0;
    transform: rotate(90deg);
    transform-origin: top left;
    -webkit-appearance: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .scroll-holder .imageSlider:focus {
    outline: none;
  }
  .scroll-holder .imageSlider::-moz-focus-outer {
    border: none;
  }
  .scroll-holder .imageSlider::-webkit-slider-runnable-track {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    height: 5px;
    z-index: 6;
  }
  .scroll-holder .imageSlider::-moz-range-track {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    height: 2px;
    z-index: 6;
  }
  .scroll-holder .imageSlider::-ms-track {
    animate: 0.2s;
    background: transparent;
    border: none;
    border-width: 15px 0;
    color: rgba(0, 0, 0, 0);
    cursor: pointer;
    height: 12px;
    width: 100%;
  }
  .scroll-holder .imageSlider::-ms-fill-lower {
    background: rgba(0, 0, 0, 0);
  }
  .scroll-holder .imageSlider::-ms-fill-upper {
    background: rgba(0, 0, 0, 0);
  }
  .scroll-holder .imageSlider::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    /* background-color: #163239; */
    background-color: ${({ theme }) => theme.color.loadColor1};;
    border: none;
    border-radius: 57px;
    cursor: -webkit-grab;
    height: 12px;
    margin-top: -4px;
    width: 39px;
  }
  .scroll-holder .imageSlider::-webkit-slider-thumb:active {
    background-color: #20a5d6;
    cursor: -webkit-grabbing;
  }
  .scroll-holder .imageSlider::-moz-range-thumb {
    background-color: #163239;
    border: none;
    border-radius: 57px;
    cursor: -moz-grab;
    height: 12px;
    width: 39px;
    z-index: 7;
  }
  .scroll-holder .imageSlider::-moz-range-thumb:active {
    background-color: #20a5d6;
    cursor: -moz-grabbing;
  }
  .scroll-holder .imageSlider::-ms-thumb {
    background-color: #163239;
    border: none;
    border-radius: 57px;
    cursor: ns-resize;
    height: 12px;
    width: 39px;
  }
  .scroll-holder .imageSlider::-ms-thumb:active {
    background-color: #20a5d6;
  }
  .scroll-holder .imageSlider::-ms-tooltip {
    display: none;
  }
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .imageSlider {
      left: 50px;
    }
  }
`;
