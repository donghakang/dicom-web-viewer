import React from "react";
import { IconContext } from "react-icons";
import ReactTooltip from "react-tooltip";

interface ButtonComponentInterface {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tooltip: string | React.ReactNode;
  size?: number;
  className: string;
  element: React.ReactNode;
  clickTrigger?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentInterface> = (props) => {
  return (
    <li>
      <button
        onClick={props.onClick}
        data-tip
        data-for={`${props.tooltip}`}
        data-event={props.clickTrigger ? "click focus" : ""}
      >
        <IconContext.Provider
          value={{
            className: props.className,
          }}
        >
          {props.element}
        </IconContext.Provider>
      </button>
      <ReactTooltip
        id={`${props.tooltip}`}
        className="custom-tooltip"
        place="bottom"
        effect="solid"
        globalEventOff={props.clickTrigger ? "click" : ""}
        clickable={props.clickTrigger}
      >
        {props.tooltip}
      </ReactTooltip>
    </li>
  );
};

export default ButtonComponent;
