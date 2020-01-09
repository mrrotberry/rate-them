import { IUser } from 'types';

import { loadUser, saveUser } from 'storage/user';

import { IUserAction } from './actions';

import { EUserActionTypes } from './types';

export const initialState: IUser = loadUser();

export const userContextReducer = (state: IUser = initialState, action: IUserAction): IUser => {
  const { type, payload } = action;

  switch (type) {
    case EUserActionTypes.SET_USER:
      return saveUser({
        name: payload.name,
        avatar: payload.avatar,
        company: payload.company,
        isAuthorization: payload.isAuthorization,
      });

    default:
      return state;
  }
};
