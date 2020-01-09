import { IUser } from 'types';

export const saveUser = (user: IUser): IUser => {
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

export const loadUser = (): IUser => {
  if (localStorage.getItem('user')) {
    return JSON.parse(<string>localStorage.getItem('user')) as IUser;
  }

  const initialState = { name: '', avatar: '', company: '', isAuthorization: false };

  saveUser(initialState);

  return initialState;
};
