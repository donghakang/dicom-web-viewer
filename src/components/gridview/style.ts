import styled from "styled-components";

export const GridComponent = styled.div`
  z-index: 9;
  padding: 0;
  background-color: red;
  width: 75px;
  height: 50px;

  .grid-row {
    display: flex;
    width: 75px;
    height: 25px;
  }

  .grid-col {
    border: 1px solid #a3a3a3;
    width: 25px;
    height: 25px;
  }

`;
