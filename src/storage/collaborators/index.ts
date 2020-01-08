import { ICollaborator } from 'types';

export const saveCollaborators = (collaborators: ICollaborator[]): ICollaborator[] => {
  localStorage.setItem('collaborators', JSON.stringify(collaborators));

  return collaborators;
};

export const loadCollaborators = (): ICollaborator[] => {
  if (localStorage.getItem('collaborators')) {
    return JSON.parse(<string>localStorage.getItem('collaborators')) as ICollaborator[];
  }

  const initialState = [] as ICollaborator[];

  saveCollaborators([]);

  return initialState;
};
