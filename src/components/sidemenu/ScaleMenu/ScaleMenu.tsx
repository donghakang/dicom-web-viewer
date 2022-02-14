import React, { useState } from "react";
import { Slider, InputNumber, Row, Col } from "antd";
import "antd/dist/antd.less";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { changeScale } from "../../../redux/reducers/toolSlice";

const ScaleMenu: React.FC = () => {
  const tools = useAppSelector((state) => state.toolType.viewportData);
  const dispatch = useAppDispatch();

  function onChange(value: number) {
    console.log("change", value);
    dispatch(changeScale(value));
  }

  return (
    <div>
      <Row>
        <Col span={12}>
          <Slider
            min={0}
            max={4}
            onChange={onChange}
            value={tools.scale}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={4}
            style={{ margin: "0 16px" }}
            step={0.01}
            value={tools.scale}
            onChange={onChange}
          />
        </Col>
      </Row>
      <div>
        <button onClick={(e) => onChange(1)}>reset</button>
      </div>
    </div>
  );
};

export default ScaleMenu;
