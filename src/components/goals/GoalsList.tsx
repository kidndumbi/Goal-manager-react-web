import { PropsWithChildren, useContext, useEffect, useReducer } from "react";
import { GoalsContext } from "../../contexts/goals.context";
import { SearchedValueContext } from "../../contexts/searchedValue.context";
import GoalItem from "./GoalItem";
import { goalsReducer } from "./reducers";

interface Props {
  selectedGoalType: string;
}

const GoalList = ({
  selectedGoalType: type,

}: PropsWithChildren<Props>) => {
  const { goalsData } = useContext<any>(GoalsContext);
  const { searchValue, setSearchValue } = useContext<any>(SearchedValueContext)

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
