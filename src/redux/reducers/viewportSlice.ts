import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ViewportInterface {
  viewport: number; // active viewport

  row: number;
  col: number;

  tool: string;
  defaultData: {
    viewport: number; // current viewport
    scale: number;
    voi: { windowWidth: number; windowCenter: number };
  }[];
  viewportData: {
    viewport: number; // current viewport
    scale: number;
    voi: { windowWidth: number; windowCenter: number };
  }[];
}

const initialState: ViewportInterface = {
  viewport: 0,
  row: 1,
  col: 1,

  tool: "Pan",
  defaultData: [
    {
      viewport: 0,
      scale: 1,
      voi: { windowWidth: 0, windowCenter: 0 },
    },
  ],
  viewportData: [
    {
      viewport: 0,
      scale: 1,
      voi: { windowWidth: 0, windowCenter: 0 },
    },
  ],
};

export const viewportSlice = createSlice({
  name: "viewport",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<string>) => {
      state.tool = action.payload;
    },
    changeViewport: (state, action: PayloadAction<number>) => {
      state.viewport = action.payload;
    },
    changeViewportArrange: (
      state,
      action: PayloadAction<{ row: number; col: number }>
    ) => {
      state.row = action.payload.row;
      state.col = action.payload.col;
    },
  },
});

export const { changeViewport, changeViewportArrange } = viewportSlice.actions;

export const viewport = (state: RootState) => state.viewport.viewport;

export default viewportSlice.reducer;
