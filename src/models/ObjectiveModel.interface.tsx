export interface ObjectiveModel {
  createDate: number;
  dueDate: number;
  id: string;
  markedForDeletion: boolean;
  markedForUpdate: boolean;
  name: string;
  status: string;
  isNew?: boolean;
  tempIdForNew?:string;
  notes?: string;
}
