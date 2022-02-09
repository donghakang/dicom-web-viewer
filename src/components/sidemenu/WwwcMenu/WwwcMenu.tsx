import React, { useState } from "react";
import { Slider, InputNumber, Row, Col } from "antd";
import "antd/dist/antd.less";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  changeScale,
  changeWc,
  changeWw,
} from "../../../redux/reducers/toolSlice";

const Wc: React.FC = () => {
  const tools = useAppSelector((state) => state.toolType.viewportData);
  const dispatch = useAppDispatch();

  function onChange(value: number) {
    dispatch(changeWc(value));
  }

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={0}
          max={4000}
          onChange={onChange}
          value={tools.voi.windowCenter}
          step={1}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={4000}
          style={{ margin: "0 16px" }}
          step={1}
          value={tools.voi.windowCenter}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

const Ww: React.FC = () => {
  const tools = useAppSelector((state) => state.toolType.viewportData);
  const dispatch = useAppDispatch();

  function onChange(value: number) {
    dispatch(changeWw(value));
  }

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={0}
          max={4000}
          onChange={onChange}
          value={tools.voi.windowWidth}
          step={1}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={4000}
          style={{ margin: "0 16px" }}
          step={1}
          value={tools.voi.windowWidth}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

const WwwcMenu: React.FC = () => {
  return (
    <div>
      <Ww />
      <Wc />
      <div>
        <button onClick={(e) => console.log("preset")}>..</button>
        <button onClick={(e) => console.log("preset")}>reset</button>
      </div>
    </div>
  );
};

export default WwwcMenu;
