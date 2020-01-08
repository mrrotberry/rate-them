import * as React from 'react';

import { initialState, userContextReducer } from './reducer';

import { IUserContextValue } from './types';

export const UserContext = React.createContext({} as IUserContextValue);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, userDispatch] = React.useReducer(userContextReducer, initialState);

  return <UserContext.Provider value={{ user, userDispatch }}>{children}</UserContext.Provider>;
};
