import * as React from 'react';

import { collaboratorsContextReducer, initialState } from './reducer';

import { ICollaboratorsContextValue } from './types';

export const CollaboratorsContext = React.createContext({} as ICollaboratorsContextValue);

export const CollaboratorsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [collaborators, collaboratorsDispatch] = React.useReducer(collaboratorsContextReducer, initialState);

  return (
    <CollaboratorsContext.Provider value={{ collaborators, collaboratorsDispatch }}>
      {children}
    </CollaboratorsContext.Provider>
  );
};
