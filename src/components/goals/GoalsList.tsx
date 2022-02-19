import { PropsWithChildren, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import GoalItem from "./GoalItem";
import { goalsReducer } from "./reducers";

interface Props {
  selectedGoalType: string;
}

const GoalList = ({
  selectedGoalType: type,
}: PropsWithChildren<Props>) => {
  const goalsData = useSelector((state: any) => state.goals.goals);

  const [goalsInfo, dispatchGoalsData] = useReducer(goalsReducer, goalsData);
  const searchValue = useSelector((state: any) => state.searchValue.searchValue);

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
