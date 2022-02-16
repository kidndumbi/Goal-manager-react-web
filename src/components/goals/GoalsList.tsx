import { PropsWithChildren, useEffect, useReducer } from "react";
import GoalItem from "./GoalItem";
import { goalsReducer } from "./reducers";

interface Props {
  goalsData: string; 
  selectedGoalType:string;
  searchValue: string;
}

const GoalList = ({goalsData, selectedGoalType:type, searchValue}: PropsWithChildren<Props>) => {
  const [goalsInfo, dispatchGoalsData] = useReducer(
    goalsReducer,
    goalsData
  );

  useEffect(() => {
    dispatchGoalsData({
      type,
      goalsData,
      searchValue,
    });
  }, [type, goalsData, searchValue]);

  return (
    <>
      {goalsInfo.map((goal: any) => {
        return <GoalItem key={goal.id} goal={goal} className="mt-3"></GoalItem>;
      })}
    </>
  );
};

export default GoalList;
