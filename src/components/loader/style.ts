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
