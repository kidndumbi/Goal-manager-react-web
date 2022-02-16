import { PropsWithChildren, useContext, useEffect, useReducer } from "react";
import { GoalsContext } from "../../contexts/goals.context";
import GoalItem from "./GoalItem";
import { goalsReducer } from "./reducers";

interface Props {
  selectedGoalType: string;
  searchValue: string;
}

const GoalList = ({
  selectedGoalType: type,
  searchValue,
}: PropsWithChildren<Props>) => {
  const { goalsData } = useContext<any>(GoalsContext);

  const [goalsInfo, dispatchGoalsData] = useReducer(goalsReducer, goalsData);

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
