import styled from "styled-components";
import { motion } from "framer-motion";

export const RightSideMenu = styled(motion.div)`
  position: fixed;
  top: var(--header-height);
  right: 0;

  width: var(--right-side-menu-width);
  height: calc(100% - var(--header-height));
  
  background-color: var(--dark-background);


  button {
    border-radius: 5px;
    border: 1px solid #000;
    bottom: 16px;
    right: 16px;
    padding: 8px;
    border-radius: 12px;
  }

  .content-container {
    margin: 40px 20px;
  }
`;


export const LeftSideMenu = styled(motion.div)`
  position: fixed;
  top: var(--header-height);
  left: 0;

  width: var(--left-side-menu-width);
  height: calc(100% - var(--header-height));
  
  background-color: var(--dark-background);
`

export const SeriesComponent = styled.div`
  width: 250px;
  height: 230px; 
  margin: 24px auto;

  .viewport-container {
    background-color: black;
    border-radius: 12px;
    border: 2px solid #000;
    padding: 5px;
  }

  .active {
    border: 2px solid ${({ theme }) => theme.color.primary};
  }

  .series-description-container {
    display: flex;
    flex-direction: column;

    .series-description {
      font-weight: var(--font-weight-heavy);
      color: white;
    }

    div {
      display: flex;
      justify-content: space-between;
    }

    svg {
      margin: auto 8px;
      fill: ${({ theme }) => theme.color.primary};
    }
  }
`
