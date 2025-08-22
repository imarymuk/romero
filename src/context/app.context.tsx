import { createContext, useState } from "react";
import { DELAY_BETWEEN_BLOCKS, FADE_IN_ANIMATION, PARENT_ANIMATION } from "../constants";

export const defaultAppContextValue :any = {
  DELAY_BETWEEN_BLOCKS,
  FADE_IN_ANIMATION,
  PARENT_ANIMATION
}

type AppContextType = {
  data: typeof defaultAppContextValue;
  updateContext: React.Dispatch<React.SetStateAction<typeof defaultAppContextValue>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }) {

  const [ defaultContextValue, setDefaultContextValue ] = useState(defaultAppContextValue);

  return <AppContext.Provider value={{data: defaultContextValue, updateContext: setDefaultContextValue}}>
    {children}
  </AppContext.Provider>
}
