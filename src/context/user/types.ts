import * as React from 'react';

import { IUser } from 'types';

import { IUserAction } from './actions';

export enum EUserActionTypes {
  SET_USER = 'SET_USER',
}

export interface IUserContextValue {
  user: IUser;
  userDispatch: React.Dispatch<IUserAction>;
}
