import * as React from 'react';

import { GlobalReducerAction } from './GlobalReducer';
import GlobalState, { GlobalStateType } from './GlobalState';

const GlobalContext = React.createContext<{
  state: GlobalStateType;
  dispatch: React.Dispatch<GlobalReducerAction>;
}>({
  state: GlobalState,
  dispatch:
    /* istanbul ignore next */
    () => undefined,
});

export default GlobalContext;
