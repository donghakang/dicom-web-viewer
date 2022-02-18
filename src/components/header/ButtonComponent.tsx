import React from "react";
import { IconContext } from "react-icons";
import ReactTooltip from 'react-tooltip'

interface ButtonComponentInterface {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tooltip: string;
  size?: number;
  className: string;
  element: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonComponentInterface> = (props) => {
  return (
    <li>
      <button onClick={props.onClick} data-tip data-for={`${props.tooltip}`}>
        <IconContext.Provider
          value={{
            className: props.className,
          }}
        >
          {props.element}
        </IconContext.Provider>
      </button>
      <ReactTooltip id={`${props.tooltip}`} className="custom-tooltip" place="bottom" effect="solid">
    {props.tooltip}
      </ReactTooltip>
    </li>
  );
};

export default ButtonComponent;
