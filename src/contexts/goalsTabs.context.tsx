import {createContext} from 'react';
import { GoalTabModel } from '../models/GoalTabModel.interface';

export const GoalsTabsContext = createContext<{goalsTabs: GoalTabModel[] , setGoalsTabs: any}>({goalsTabs: [], setGoalsTabs: null})
