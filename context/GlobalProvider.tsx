import * as React from 'react';

import GlobalContext from './GlobalContext';
import GlobalReducer from './GlobalReducer';
import GlobalState from './GlobalState';

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = React.useReducer(GlobalReducer, GlobalState);

  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
