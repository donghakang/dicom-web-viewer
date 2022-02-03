import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ToolInterface {
    tool: any
}

const initialState: ToolInterface = {
    tool: 'Pan'
}

export const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    reset: (state) => {
      state.tool = 'Pan';
    },
    setTool: (state, action: PayloadAction<string>) => {
        state.tool = action.payload;
    },
  },
});


export const { reset, setTool } = toolSlice.actions

export const tool = (state: RootState) => state.tool

export default toolSlice.reducer