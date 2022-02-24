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
    border: 1px solid #fff;
    color: white;
    bottom: 16px;
    right: 16px;
    padding: 8px 12px;
    border-radius: 12px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover { 
      background-color: ${({ theme }) => theme.color.primary};
      border: 1px solid ${({ theme }) => theme.color.primary};
    }
  }

  .content-container {
    margin: 40px 20px;

    span {
      font-weight: 500;
      color: ${({ theme }) => theme.color.gray};
    }
  }

  .preset-container{
    margin: 40px 0px;
  }

  .multiple-presets{
    button {
      margin: 0px 12px
    }
    button:nth-child(1) {
      margin: 0;
    }
  }

  //Info View
  table {
    tr {
      line-height: 40px;
      border-bottom: 1px solid ${({ theme }) => theme.color.primary3 + '99'};
    }
    th {
      color: ${({ theme }) => theme.color.primary2};
      text-align: left;
    }

    td {
      color: #fff;

    }
  }
`;


export const LeftSideMenu = styled(motion.div)`
  position: fixed;
  top: var(--header-height);
  left: 0;

  overflow-y: scroll;
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
