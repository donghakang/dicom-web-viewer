import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ViewportInterface {
  allViewport: boolean;
  viewport: number; // active viewport

  row: number;
  col: number;

  deidentification: boolean;
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
  allViewport: false,
  viewport: 0,
  row: 1,
  col: 1,
  deidentification: false,
  tool: "Pan",
  defaultData: Array(6).fill({
    viewport: 0,
    scale: 1,
    voi: { windowWidth: 0, windowCenter: 0 },
  }),
  viewportData: Array(6).fill({
    viewport: 0,
    scale: 1,
    voi: { windowWidth: 0, windowCenter: 0 },
  }),
};

export const viewportSlice = createSlice({
  name: "viewport",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<string>) => {
      state.tool = action.payload;
    },
    // All Viewport Selected
    allViewportOn: (state) => {
      state.allViewport = true;
    },
    allViewportOff: (state) => {
      state.allViewport = false;
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

    setDefaultData: (
      state,
      action: PayloadAction<{ windowWidth: number; windowCenter: number }>
    ) => {
      // console.log("set default data", action.payload);
      const voi = action.payload;
      let prevDefaultData = [...state.defaultData];
      prevDefaultData.map((data, idx) => {
        data.voi = voi;
        data.viewport = idx;
      });
      state.defaultData = prevDefaultData;
    },
    changeScale: (
      state,
      action: PayloadAction<{ viewport: number; scale: number }>
    ) => {
      let prevViewportData = [...state.viewportData];
      let selectedViewportData = prevViewportData[action.payload.viewport];
      selectedViewportData.scale = action.payload.scale;

      state.viewportData = prevViewportData;
    },
    changeWw: (
      state,
      action: PayloadAction<{ viewport: number; ww: number }>
    ) => {
      let prevViewportData = [...state.viewportData];
      let selectedViewportData = prevViewportData[action.payload.viewport];
      selectedViewportData.voi = {
        ...selectedViewportData.voi,
        windowWidth: action.payload.ww,
      };

      state.viewportData = prevViewportData;
    },
    changeWc: (
      state,
      action: PayloadAction<{ viewport: number; wc: number }>
    ) => {
      let prevViewportData = [...state.viewportData];
      let selectedViewportData = prevViewportData[action.payload.viewport];
      selectedViewportData.voi = {
        ...selectedViewportData.voi,
        windowCenter: action.payload.wc,
      };

      state.viewportData = prevViewportData;
    },
    changeDeidentification: (state) => {
      state.deidentification = !state.deidentification;
    },
  },
});

export const {
  changeMode,
  allViewportOn,
  allViewportOff,
  changeViewport,
  changeViewportArrange,
  setDefaultData,
  changeScale,
  changeWw,
  changeWc,
  changeDeidentification,
} = viewportSlice.actions;

export const viewport = (state: RootState) => state.viewport.viewport;

export default viewportSlice.reducer;
