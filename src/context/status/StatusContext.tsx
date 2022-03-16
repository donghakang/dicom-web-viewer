import React, { createContext, Dispatch, useReducer, useContext } from "react";

type StatusState = {
  trial: number;
};

type StatusAction =
  | {
      type: "RESET";
    }
  | {
      type: "NEXT";
    };

const initState = {
  trial: 0,
};

type StatusDispatch = Dispatch<StatusAction>;

const StatusStateContext = createContext<StatusState | null>(null);
const StatusDispatchContext = createContext<StatusDispatch | null>(null);

function StatusReducer(state: StatusState, action: StatusAction): StatusState {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        trial: 0,
      };
    case "NEXT":
      return {
        ...state,
        trial: state.trial + 1,
      };

    default:
      throw new Error("Unhandled action");
  }
}

export function StatusProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(StatusReducer, initState);

  return (
    <StatusStateContext.Provider value={state}>
      <StatusDispatchContext.Provider value={dispatch}>
        {children}
      </StatusDispatchContext.Provider>
    </StatusStateContext.Provider>
  );
}

export function useStatusState() {
  const state = useContext(StatusStateContext);
  if (!state) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useStatusDispatch() {
  const dispatch = useContext(StatusDispatchContext);
  if (!dispatch) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
