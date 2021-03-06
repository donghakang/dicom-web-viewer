import React from 'react';
import { IconContext } from 'react-icons';
import ReactTooltip from 'react-tooltip';

interface ButtonComponentInterface {
  id: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  tooltip: string | React.ReactNode;
  size?: number;
  className: string;
  element: React.ReactNode;
  clickTrigger?: boolean;
  link?: string;
}

const ButtonComponent: React.FC<ButtonComponentInterface> = (props) => {
  return (
    <li>
      {!props.link ? (
        <button
          onClick={props.onClick}
          data-tip
          data-for={`${props.id}`}
          data-event={props.clickTrigger ? 'click focus' : ''}
        >
          <IconContext.Provider
            value={{
              className: props.className,
            }}
          >
            {props.element}
          </IconContext.Provider>
        </button>
      ) : (
        <button>
          <a
            href={props.link}
            data-tip
            data-for={`${props.id}`}
            data-event={props.clickTrigger ? 'click focus' : ''}
          >
            <IconContext.Provider
              value={{
                className: props.className,
              }}
            >
              {props.element}
            </IconContext.Provider>
          </a>
        </button>
      )}
      <ReactTooltip
        id={`${props.id}`}
        className="custom-tooltip"
        place="bottom"
        effect="solid"
        globalEventOff={props.clickTrigger ? 'click' : ''}
        clickable={props.clickTrigger}
      >
        {props.tooltip}
      </ReactTooltip>
    </li>
  );
};

export default ButtonComponent;
