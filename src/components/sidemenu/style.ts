import styled from "styled-components";
import { motion } from "framer-motion";

export const RightSideMenu = styled(motion.div)`
  position: fixed;

  top: var(--header-height);
  right: 0;

  width: var(--side-menu-width);
  height: calc(100% - var(--header-height));
  
  background-color: #999;


  button {
    border-radius: 5px;
    border: 1px solid #000;
    bottom: 16px;
    right: 16px;
    padding: 8px;
    border-radius: 12px;
  }
`;


export const LeftSideMenu = styled(motion.div)`
  position: fixed;
  top: var(--header-height);
  right: 0;

  width: var(--side-menu-width);
  height: calc(100% - var(--header-height));
  
  background-color: #999;

`