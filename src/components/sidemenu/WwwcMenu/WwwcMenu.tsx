import React, { useState } from "react";
import { Slider, InputNumber, Row, Col } from "antd";
import "antd/dist/antd.less";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  changeScale,
  changeWc,
  changeWw,
} from "../../../redux/reducers/toolSlice";

import { Box, Grid } from "@mui/material";
import { CustomSlider, Input } from "../../../assets/styles/mui-style";

const Ww: React.FC = () => {
  const tools = useAppSelector((state) => state.toolType.viewportData);
  const dispatch = useAppDispatch();

  function onSlideChange(
    event: Event | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: number
  ) {
    dispatch(changeWw(value));
  }

  function onInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    //TODO: change 1 to default value
    const val = event.target.value === "" ? 1 : Number(event.target.value);
    dispatch(changeWw(val));
  }

  return (
    <Box width="100%">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <CustomSlider
            min={0}
            max={4000}
            step={1}
            onChange={(e, v, a) => onSlideChange(e, v as number)}
            aria-label="Default"
            valueLabelDisplay="auto"
            value={tools.voi.windowWidth}
          />
        </Grid>
        <Grid item>
          <Input
            value={tools.voi.windowWidth}
            size="small"
            onChange={onInputChange}
            sx={{width: 60}}
            inputProps={{
              step: 1,
              min: 0,
              max: 4000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const Wc: React.FC = () => {
  const tools = useAppSelector((state) => state.toolType.viewportData);
  const dispatch = useAppDispatch();

  function onSlideChange(
    event: Event | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: number
  ) {
    dispatch(changeWc(value));
  }

  function onInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const val = event.target.value === "" ? 1 : Number(event.target.value);
    dispatch(changeWc(val));
  }

  return (
    <Box width="100%">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <CustomSlider
            min={-4000}
            max={4000}
            step={1}
            
            onChange={(e, v, a) => onSlideChange(e, v as number)}
            aria-label="Default"
            valueLabelDisplay="auto"
            value={tools.voi.windowCenter}
          />
        </Grid>
        <Grid item>
          <Input
            value={tools.voi.windowCenter}
            size="small"
            onChange={onInputChange}
            sx={{width: 60}}
            inputProps={{
              step: 1,
              min: -4000,
              max: 4000,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const WwwcMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const defaultData = useAppSelector((state) => state.toolType.defaultData);

  function applyPreset(ww: number, wc: number) {
    dispatch(changeWw(ww));
    dispatch(changeWc(wc));
  }

  return (
    <div className="content-container">
      <span>Window: </span>
      <Ww />
      <span>Level: </span>
      <Wc />
      <div className="preset-container multiple-presets">
        <button onClick={(e) => applyPreset(1500, -500)}>Lung</button>
        <button onClick={(e) => applyPreset(750, -700)}>
          Emphysema Narrow
        </button>
      </div>
      <div className="preset-container">
        <button
          onClick={(e) =>
            applyPreset(
              defaultData.voi.windowWidth,
              defaultData.voi.windowCenter
            )
          }
        >
          reset
        </button>
      </div>
    </div>
  );
};

export default WwwcMenu;
