import { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GoalsTabList from "../../components/goals-tabs/GoalsTabList";
import GoalList from "../../components/goals/GoalsList";

interface Props {
  searchValue: string;
}
const AllGoals = (props: PropsWithChildren<Props>) => {
  const [selectedGoalType, setSelectedGoalType] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: { currentPage: "MainPage" },
    });
  }, []);

  const goalTypeSelectedHandler = (selected: any) => {
    setSelectedGoalType(selected);
  };
  return (
    <>
      <GoalsTabList onGoalTypeSelected={goalTypeSelectedHandler}></GoalsTabList>
      <GoalList
        selectedGoalType={selectedGoalType}
        searchValue={props.searchValue}
      ></GoalList>
    </>
  );
};

export default AllGoals;
