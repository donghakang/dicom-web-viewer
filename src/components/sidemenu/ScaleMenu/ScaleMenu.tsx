import React, { useState } from "react";
import { InputNumber, Row, Col } from "antd";
import "antd/dist/antd.less";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { changeScale } from "../../../redux/reducers/toolSlice";
import { Box, Grid } from "@mui/material";
import { CustomSlider, Input } from "../../../assets/styles/mui-style";

const ScaleMenu: React.FC = () => {
  const tools = useAppSelector((state) => state.toolType.viewportData);
  const dispatch = useAppDispatch();

  function onSlideChange(
    event: Event | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: number
  ) {
    console.log("change", value);
    dispatch(changeScale(value));
  }

  function onInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const val = event.target.value === "" ? 1 : Number(event.target.value);
    dispatch(changeScale(val));
  }

  function onReset() {
    dispatch(changeScale(1));
  }

  return (
    <div className="content-container">
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
              value={tools.scale}
            />
          </Grid>
          <Grid item>
            <Input
              value={tools.scale}
              size="small"
              onChange={onInputChange}
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
      <div>
        <button onClick={onReset}>reset</button>
      </div>
    </div>
  );
};

export default ScaleMenu;
