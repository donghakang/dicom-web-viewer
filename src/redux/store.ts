import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./reducers/imageSlice";
import viewportReducer from './reducers/viewportSlice'
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    imageLoader: imageReducer,
    viewport: viewportReducer,
  },
  // middleware:  (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
