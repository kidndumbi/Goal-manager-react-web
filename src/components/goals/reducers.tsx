const goalsReducer = (state: any, action: any) => {
  let goals = [];

  if (action.type === "ALL") {
    goals = action.goalsData;
  } else {
    const filteredGoals = action.goalsData.filter(
      (goal: any) => goal.status === action.type
    );
    console.log('filtered goals = ', filteredGoals);
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
