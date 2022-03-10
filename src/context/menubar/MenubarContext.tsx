import React, {
  createContext,
  Dispatch,
  useReducer,
  useContext,
} from "react";

type SideMenuState = {
  leftSideMenuOpened: boolean;
  rightSideMenuOpened: boolean;
};

type SideMenuAction =
  | {
      type: "LEFT_OPEN";
    }
  | {
      type: "LEFT_CLOSE";
    }
  | {
      type: "RIGHT_OPEN";
    }
  | {
      type: "RIGHT_CLOSE";
    }
  | {
      type: "LEFT_TRIGGER";
    }
  | {
      type: "RIGHT_TRIGGER";
    };

type SideMenuDispatch = Dispatch<SideMenuAction>;

const SideMenuStateContext = createContext<SideMenuState | null>(null);
const SideMenuDispatchContext = createContext<SideMenuDispatch | null>(null);

function SideMenuReducer(
  state: SideMenuState,
  action: SideMenuAction
): SideMenuState {
  switch (action.type) {
    case "LEFT_OPEN":
      state.leftSideMenuOpened = true;
      return {
        ...state,
        leftSideMenuOpened: true,
      };
    case "LEFT_CLOSE":
      return {
        ...state,
        leftSideMenuOpened: false,
      };
    case "RIGHT_OPEN":
      return {
        ...state,
        rightSideMenuOpened: true,
      };
    case "RIGHT_CLOSE":
      return {
        ...state,
        rightSideMenuOpened: false,
      };
    case "LEFT_TRIGGER":
      return {
        ...state,
        leftSideMenuOpened: !state.leftSideMenuOpened,
      };
    case "RIGHT_TRIGGER":
      return {
        ...state,
        rightSideMenuOpened: !state.rightSideMenuOpened,
      };
    default:
      throw new Error("Unhandled action");
  }
}

export function MenubarProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(SideMenuReducer, {
    leftSideMenuOpened: false,
    rightSideMenuOpened: false,
  });

  return (
    <SideMenuStateContext.Provider value={state}>
      <SideMenuDispatchContext.Provider value={dispatch}>
        {children}
      </SideMenuDispatchContext.Provider>
    </SideMenuStateContext.Provider>
  );
}

export function useSideMenuState() {
  const state = useContext(SideMenuStateContext);
  if (!state) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useSideMenuDispatch() {
  const dispatch = useContext(SideMenuDispatchContext);
  if (!dispatch) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
