import React from 'react';
import { IconContext } from 'react-icons';
import * as Styled from './style';

interface TooltipeInterface {
  id: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tooltip: string | React.ReactNode;
  size?: number;
  className: string;
  element: React.ReactNode;
  clickTrigger?: boolean;
}

const Tooltip: React.FC<TooltipeInterface> = (props) => {
  return (
    <li>
      <Styled.Tooltip id={props.id} onClick={props.onClick}>
        <IconContext.Provider
          value={{
            className: props.className,
          }}
        >
          {props.element}
        </IconContext.Provider>
        <span className="arrow"></span>
        <span className="tooltip">{props.tooltip}</span>
      </Styled.Tooltip>
    </li>
  );
};

export default Tooltip;
