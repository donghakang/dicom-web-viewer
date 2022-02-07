import styled from "styled-components";
import { motion } from "framer-motion";

export const RightSideMenu = styled(motion.div)`
  position: fixed;

  top: var(--header-height);;
  right: 0;
  width: 320px;
  height: calc(100% - var(--header-height));

  background-color: aliceblue;
`;
