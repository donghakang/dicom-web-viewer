import React from "react";
import * as Styled from "./style";

interface ImageScrollbarInterface {
  value: number;
  max: number;
  height: string;
  onInputCallback: (value: number) => void;
}

const ImageScrollbar: React.FC<ImageScrollbarInterface> = (props) => {
  const { value, height, max, onInputCallback } = props;

  if (props.max === 0) {
    return null;
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const intValue = parseInt(event.target.value, 10);
    onInputCallback(intValue);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // We don't allow direct keyboard up/down input on the
    // image sliders since the natural direction is reversed (0 is at the top)

    // Store the KeyCodes in an object for readability
    const keys = {
      DOWN: 40,
      UP: 38,
    };

    // TODO: Enable scroll down / scroll up without depending on ohif-core
    // console.log('key pressed', event)
    if (event.which === keys.DOWN) {
      //OHIF.commands.run('scrollDown');
      event.preventDefault();
    } else if (event.which === keys.UP) {
      //OHIF.commands.run('scrollUp');
      event.preventDefault();
    }
  }

  return (
    <Styled.ImageScrollbar>
      <div className="scroll-holder">
        <input
          className="imageSlider"
          style={{ width: `${height}` }}
          type="range"
          min="0"
          max={max}
          step="1"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </Styled.ImageScrollbar>
  );
};

export default ImageScrollbar;
