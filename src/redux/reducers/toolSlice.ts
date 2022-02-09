import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ToolInterface {
  tool: string;
  defaultData: {
    scale: number;
    voi: { windowWidth: number; windowCenter: number };
  };
  viewportData: {
    scale: number;
    voi: { windowWidth: number; windowCenter: number };
  };
}

const initialState: ToolInterface = {
  tool: "Pan",
  defaultData: {
    scale: 1,
    voi: { windowWidth: 0, windowCenter: 0 },
  },
  viewportData: {
    scale: 1,
    voi: { windowWidth: 0, windowCenter: 0 },
  },
};

export const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<string>) => {
      state.tool = action.payload;
    },
    setDefaultData: (state, action: PayloadAction<{windowWidth: number, windowCenter: number}>) => {
      console.log('set default data', action.payload)
      const voi = action.payload
      let prevDefaultData = {...state.defaultData }
      prevDefaultData.voi = voi
      state.defaultData = prevDefaultData
    },
    changeScale: (state, action: PayloadAction<number>) => {
      let prevViewportData = { ...state.viewportData };
      prevViewportData.scale = action.payload;

      state.viewportData = prevViewportData;
    },
    changeWw: (state, action: PayloadAction<number>) => {
      let prevViewportData = { ...state.viewportData };
      prevViewportData.voi.windowWidth = action.payload;

      state.viewportData = prevViewportData;
    },
    changeWc: (state, action: PayloadAction<number>) => {
      let prevViewportData = { ...state.viewportData };
      prevViewportData.voi.windowCenter = action.payload;

      state.viewportData = prevViewportData;
    },
  },
});

export const { changeMode, setDefaultData, changeScale, changeWw, changeWc } = toolSlice.actions;

export const tool = (state: RootState) => state.toolType.tool;

export default toolSlice.reducer;
