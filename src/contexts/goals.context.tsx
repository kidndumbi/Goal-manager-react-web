import { createContext } from 'react';
import { GoalModel } from '../models/GoalModel.interface';

export const GoalsContext = createContext<{goalsData: GoalModel[]}>({goalsData: []})
