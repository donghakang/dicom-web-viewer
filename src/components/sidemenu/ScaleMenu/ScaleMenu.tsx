import React, { useState } from "react";
import { InputNumber, Row, Col } from "antd";
import "antd/dist/antd.less";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Box, Grid } from "@mui/material";
import { CustomSlider, Input } from "../../../assets/styles/mui-style";
import { changeScale } from "../../../redux/reducers/viewportSlice";

const ScaleMenu: React.FC = () => {
  const { viewportData, viewport } = useAppSelector((state) => state.viewport);
  const dispatch = useAppDispatch();

  function onSlideChange(
    event: Event | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: number
  ) {
    dispatch(changeScale({ viewport: viewport, scale: value }));
  }

  function onInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const val = event.target.value === "" ? 1 : Number(event.target.value);
    dispatch(changeScale({ viewport: viewport, scale: val }));
  }

  function onReset() {
    dispatch(changeScale({ viewport: viewport, scale: 1 }));
  }

  return (
    <div className="content-container">
      <span>Scale: </span>
      <Box width="100%">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <CustomSlider
              min={0}
              max={4}
              step={0.01}
              onChange={(e, v, a) => onSlideChange(e, v as number)}
              aria-label="Default"
              valueLabelDisplay="auto"
              value={viewportData[viewport].scale}
            />
          </Grid>
          <Grid item>
            <Input
              value={viewportData[viewport].scale}
              size="small"
              onChange={onInputChange}
              sx={{ width: 60 }}
              inputProps={{
                step: 0.01,
                min: 0,
                max: 4,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <div className="preset-container">
        <button onClick={onReset}>reset</button>
      </div>
    </div>
  );
};

export default ScaleMenu;
