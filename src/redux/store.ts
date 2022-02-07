import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./reducers/imageSlice";

const store = configureStore({
  reducer: {
    imageLoader: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
