import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./reducers/imageSlice";
import toolReducer from "./reducers/toolSlice";

const store = configureStore({
  reducer: {
    imageLoader: imageReducer,
    tool: toolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
