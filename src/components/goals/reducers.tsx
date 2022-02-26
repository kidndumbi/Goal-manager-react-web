import { GoalModel } from "../../models/GoalModel.interface";

const goalsReducer = (state: any, action: { type: string; goalsData: any[]; searchValue: string; }) => {
  let goals: GoalModel[] = [];

  if (action.type === "ALL") {
    goals = action.goalsData;
  } else {
    const filteredGoals = action.goalsData.filter(
      (goal: any) => goal.status === action.type
    );
    goals = filteredGoals;
  }

  if (action.searchValue.trim()) {
    return goals.filter((goal: any) =>
      goal.name.toLowerCase().includes(action.searchValue.trim())
    );
  } else {
    return goals;
  }
};

export { goalsReducer };
