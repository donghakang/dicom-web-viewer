import styled from "styled-components";

export const StartViewer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  .grid-loader {
    margin: auto;
    width: 63px;
  }

  .loader-text {
    text-align: center;
    margin-top: 8px;

    h1 {
      span {
        top: 0;
        background: linear-gradient(
          to right,
          ${({ theme }) => theme.color.primary},
          ${({ theme }) => theme.color.primary2}
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    span {
      position: relative;
      top: 8px;
    }
  }
`;
