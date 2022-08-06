import { ObjectiveModel } from "./ObjectiveModel.interface";

export interface GoalModel {
  createDate?: number;
  dueDate?: number;
  failDate?: any;
  history?: any;
  id?: string;
  name: string;
  notes?: string;
  objectives: ObjectiveModel[];
  status?: "FAILED" | "IN_PROGRESS" | "COMPLETE";
  images?: any[];
}
