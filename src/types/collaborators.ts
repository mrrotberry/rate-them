export interface ICollaborator {
  id: string;
  name: string;
  score: number;
  history: ICollaboratorHistory[];
}

export interface ICollaboratorHistory {
  date: number;
  change: string;
  description?: string;
}
