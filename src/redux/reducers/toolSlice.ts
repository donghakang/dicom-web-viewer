import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ToolInterface {
  tool: string;
  viewportData: {
    scale: number;
    voi: { windowWidth: number; windowCenter: number };
  };
}

const initialState: ToolInterface = {
  tool: "Pan",
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

export const { changeMode } = toolSlice.actions;

export const tool = (state: RootState) => state.toolType.tool;

export default toolSlice.reducer;
