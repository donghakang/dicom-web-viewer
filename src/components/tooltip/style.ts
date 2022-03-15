import styled from "styled-components";

export const Tooltip = styled.button`
  position: relative;

  span {
    visibility: hidden;
    transition: opacity 0.3s ease-out;
    opacity: 0;
  }

  .arrow {
    /* background-color: ${({ theme }) => theme.color.dark} !important; */
    position: absolute;
    left: 0.8rem;
    top: 2.6rem;

    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid ${({ theme }) => theme.color.dark} !important;
  }

  .tooltip {
    color: ${({ theme }) => theme.color.primary} !important;
    background-color: ${({ theme }) => theme.color.dark} !important;

    width: 120px;
    text-align: center;
    border-radius: 3px;
    padding: 8px 2px;

    /* Position the tooltip */
    position: absolute;

    font-size: 13px;
    z-index: 1;
    transform: translate(-3rem, 2.6rem);
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;
