import styled from "styled-components";

export const Header = styled.nav`
  padding-top: 4px;
  height: var(--header-height);
  background-color: var(--dark-background);
  /* border-bottom: 1px solid ${({ theme }) => theme.color.primary3};
   */
  
  display: flex;
  flex-direction: column;

  div{
    height: 40px;
    border-bottom: 1px solid #ffffffbb;
    
  }

  .button-container {
    border-bottom: 1px solid #ffffff55;
    padding-left: 20px;
    ul {
      margin: 0;
      padding: 0;
      height: 100%;
      display: flex;

      li {
        list-style-type: none;
        margin: 0;

        button {
          height: 100%;

          .button-component {
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);;
            color: ${({ theme }) => theme.color.primary2};

            * {
              margin: auto;
            }
          }

          .button-component:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }

      // 2nd ul
      &:nth-child(1) {
        margin-left: 0px;
      }
    }
  }

  .menu-button-container {
    display: flex;
    justify-content: space-between;

    button {
      width: 80px;
      height: 24px;
      border-radius: 10px;
      background-color: ${({ theme }) => theme.color.primary2};
      transition: background-color 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      margin: auto 12px;

      svg {
        margin: auto;
        fill: #333;
      }

      &:hover {
        background-color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;
