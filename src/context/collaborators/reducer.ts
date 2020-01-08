import { loadCollaborators, saveCollaborators } from 'storage/collaborators';

import { ICollaborator } from 'types/collaborators';

import { ICollaboratorsAction } from './actions';

import { ECollaboratorsActionTypes } from './types';

export const initialState = loadCollaborators();

export const collaboratorsContextReducer = (state: ICollaborator[] = initialState, action: ICollaboratorsAction) => {
  const { type, payload } = action;

  switch (type) {
    case ECollaboratorsActionTypes.ADD_COLLABORATOR:
      return saveCollaborators([...state, payload]);

    case ECollaboratorsActionTypes.EDIT_COLLABORATOR:
      return saveCollaborators([...state.filter(collaborator => collaborator.id !== payload?.id), payload]);

    case ECollaboratorsActionTypes.DELETE_COLLABORATOR:
      return saveCollaborators([...state.filter(collaborator => collaborator.id !== payload.id)]);

    default:
      return state;
  }
};
