import React, { useState } from "react";
import { Slider, InputNumber, Row, Col } from "antd";
// import "antd/dist/antd.less";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import { Box, Grid } from "@mui/material";
import { CustomSlider, Input } from "../../../assets/styles/mui-style";
import { changeWc, changeWw } from "../../../redux/reducers/viewportSlice";

const Ww: React.FC<{ viewport: number }> = ({ viewport }) => {
  const tools = useAppSelector((state) => state.viewport.viewportData);
  const dispatch = useAppDispatch();

  function onSlideChange(
    event: Event | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: number
  ) {
    dispatch(changeWw({ viewport: viewport, ww: value }));
  }

  function onInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    //TODO: change 1 to default value
    const val = event.target.value === "" ? 1 : Number(event.target.value);
    dispatch(changeWw({ viewport: viewport, ww: val }));
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
            value={tools[viewport].voi.windowWidth}
          />
        </Grid>
        <Grid item>
          <Input
            value={tools[viewport].voi.windowWidth}
            size="small"
            onChange={onInputChange}
            sx={{ width: 60 }}
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

const Wc: React.FC<{ viewport: number }> = ({ viewport }) => {
  const tools = useAppSelector((state) => state.viewport.viewportData);
  const dispatch = useAppDispatch();

  function onSlideChange(
    event: Event | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: number
  ) {
    dispatch(changeWc({ viewport: viewport, wc: value }));
  }

  function onInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const val = event.target.value === "" ? 1 : Number(event.target.value);
    dispatch(changeWc({ viewport: viewport, wc: val }));
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
            value={tools[viewport].voi.windowCenter}
          />
        </Grid>
        <Grid item>
          <Input
            value={tools[viewport].voi.windowCenter}
            size="small"
            onChange={onInputChange}
            sx={{ width: 60 }}
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
  const { defaultData, viewport } = useAppSelector((state) => state.viewport);

  function applyPreset(ww: number, wc: number) {
    dispatch(changeWw({ viewport: viewport, ww: ww }));
    dispatch(changeWc({ viewport: viewport, wc: wc }));
  }

  return (
    <div className="content-container">
      <span>Window: </span>
      <Ww viewport={viewport} />
      <span>Level: </span>
      <Wc viewport={viewport} />
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
              defaultData[viewport].voi.windowWidth,
              defaultData[viewport].voi.windowCenter
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
