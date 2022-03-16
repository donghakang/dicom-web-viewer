import styled from "styled-components";

interface ProgressBarInterface {
  progress: number;
}

export const ProgressBar = styled.div<ProgressBarInterface>`
  position: fixed;
  top: 0;

  width: ${(props) => props.progress + "vw"};

  margin: 0;
  padding: 0;

  height: 4px;
  border-radius: 4px;
  background: ${(props) =>
    `linear-gradient(90deg, ${props.theme.color.primary}, ${props.theme.color.primary})`};
`;


export const LoadViewer = styled.div`
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
