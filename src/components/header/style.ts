import styled from "styled-components";

export const Header = styled.nav`
  margin-top: 4px;
  height: 40px;
  background-color: #333;
  display: flex;

  ul {
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    margin-left: 20px;

    li {
      list-style-type: none;
      margin: 0;

      button {
        height: 100%;

        .button-component {
          display: flex;
          flex-direction: column;

          * {
            margin: auto;
          }
        }
      }
    }

    // 2nd ul
    &:nth-child(1) {
      margin-left: 0px;
    }
  }
`;
