import * as React from 'react';

import GlobalContext from './GlobalContext';
import GlobalReducer from './GlobalReducer';
import GlobalState from './GlobalState';

import { getAlbums } from './GlobalActions';
interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider = ({ children, ...props }: GlobalProviderProps) => {
  const [state, dispatch] = React.useReducer(GlobalReducer, GlobalState);
  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
