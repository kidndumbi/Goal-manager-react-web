import { useEffect, useReducer } from "react";
import GoalItem from "./GoalItem";
import { goalsReducer } from "./reducers";

const GoalList = ({goalsData, selectedGoalType, searchValue}: any) => {
  const [goalsInfo, dispatchGoalsData] = useReducer(
    goalsReducer,
    goalsData
  );

  useEffect(() => {
    dispatchGoalsData({
      type: selectedGoalType,
      goalsData: goalsData,
      searchValue: searchValue,
    });
  }, [selectedGoalType, goalsData, searchValue]);

  return (
    <>
      {goalsInfo.map((goal: any) => {
        return <GoalItem key={goal.id} goal={goal} className="mt-3"></GoalItem>;
      })}
    </>
  );
};

export default GoalList;
