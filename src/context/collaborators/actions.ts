import { ICollaborator } from 'types/collaborators';

import { ECollaboratorsActionTypes } from './types';

export interface ICollaboratorsAction {
  type: ECollaboratorsActionTypes;
  payload: ICollaborator;
}

export const collaboratorsAction = ({ type, payload }: ICollaboratorsAction) => ({
  type,
  payload,
});
