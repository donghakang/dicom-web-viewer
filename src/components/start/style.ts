import styled from "styled-components";

export const StartViewer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .container {
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
  }
`;
