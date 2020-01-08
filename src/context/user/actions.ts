import { IUser } from 'types/user';

import { EUserActionTypes } from './types';

export interface IUserAction {
  type: EUserActionTypes;
  payload: IUser;
}

export const userAction = ({ type, payload }: IUserAction): IUserAction => ({
  type,
  payload,
});
