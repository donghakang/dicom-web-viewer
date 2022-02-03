import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ImageInterface {
    images: any[]
}

const initialState: ImageInterface = {
    images: []
}

export const imageSlice = createSlice({
  name: "imageLoader",
  initialState,
  reducers: {
    reset: (state) => {
      state.images = [];
    },
    setImages: (state, action: PayloadAction<any[]>) => {
      state.images = action.payload;
    },
  },
});


export const { reset, setImages } = imageSlice.actions

export const imageLoader = (state: RootState) => state.imageLoader.images

export default imageSlice.reducer