import * as React from 'react';

import { ICollaborator } from 'types';

import { ICollaboratorsAction } from './actions';

export enum ECollaboratorsActionTypes {
  ADD_COLLABORATOR = 'ADD_COLLABORATOR',
  DELETE_COLLABORATOR = 'DELETE_COLLABORATOR',
  EDIT_COLLABORATOR = 'EDIT_COLLABORATOR',
}

export interface ICollaboratorsContextValue {
  collaborators: ICollaborator[];
  collaboratorsDispatch: React.Dispatch<ICollaboratorsAction>;
}
