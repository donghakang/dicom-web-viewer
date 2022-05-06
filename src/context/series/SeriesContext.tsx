import React, { createContext, Dispatch, useReducer, useContext } from 'react';

type SeriesState = {
  currentSeries: number;
};

type SeriesAction =
  | {
      type: 'RESET_SERIES';
    }
  | {
      type: 'SET_CURRENT_SERIES';
      currentSeries: number;
    };

const initState = {
  currentSeries: 0,
};

type SeriesDispatch = Dispatch<SeriesAction>;

const SeriesStateContext = createContext<SeriesState | null>(null);
const SeriesDispatchContext = createContext<SeriesDispatch | null>(null);

function SeriesReducer(state: SeriesState, action: SeriesAction): SeriesState {
  switch (action.type) {
    case 'RESET_SERIES':
      return {
        ...state,
        currentSeries: 0,
      };
    case 'SET_CURRENT_SERIES':
      return {
        ...state,
        currentSeries: action.currentSeries,
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function SeriesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(SeriesReducer, initState);

  return (
    <SeriesStateContext.Provider value={state}>
      <SeriesDispatchContext.Provider value={dispatch}>
        {children}
      </SeriesDispatchContext.Provider>
    </SeriesStateContext.Provider>
  );
}

export function useSeriesState() {
  const state = useContext(SeriesStateContext);
  if (!state) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useSeriesDispatch() {
  const dispatch = useContext(SeriesDispatchContext);
  if (!dispatch) throw new Error('Cannot find SampleProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
