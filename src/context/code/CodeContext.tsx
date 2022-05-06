import React, { createContext, Dispatch, useReducer, useContext } from 'react';

type PasscodeState = {
  isLog: boolean;
};

type PasscodeAction =
  | {
      type: 'LOGOUT';
    }
  | {
      type: 'LOGIN';
    };

type PasscodeDispatch = Dispatch<PasscodeAction>;

const PasscodeStateContext = createContext<PasscodeState | null>(null);
const PasscodeDispatchContext = createContext<PasscodeDispatch | null>(null);

function PasscodeReducer(
  state: PasscodeState,
  action: PasscodeAction
): PasscodeState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLog: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLog: false,
      };

    default:
      throw new Error('Unhandled action');
  }
}

export function PasscodeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(PasscodeReducer, {
    isLog: false,
  });

  return (
    <PasscodeStateContext.Provider value={state}>
      <PasscodeDispatchContext.Provider value={dispatch}>
        {children}
      </PasscodeDispatchContext.Provider>
    </PasscodeStateContext.Provider>
  );
}

export function usePasscodeState() {
  const state = useContext(PasscodeStateContext);
  if (!state) throw new Error('Cannot find PasscodeProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function usePasscodeDispatch() {
  const dispatch = useContext(PasscodeDispatchContext);
  if (!dispatch) throw new Error('Cannot find PasscodeProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
