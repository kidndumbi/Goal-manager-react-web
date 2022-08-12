import { PropsWithChildren, useEffect, useState } from "react";
import GoalsTabList from "../../components/goals-tabs/GoalsTabList";
import GoalList from "../../components/goals/GoalsList";
import { useAppDispatch } from "../../store";
import { currentPageActions } from "../../store/currentPage";

interface Props {}
const AllGoals = (props: PropsWithChildren<Props>) => {
  const [selectedGoalType, setSelectedGoalType] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentPageActions.setCurrentPage({ currentPage: "MainPage" }));
  }, []);

  const goalTypeSelectedHandler = (selected: any) => {
    setSelectedGoalType(selected);
  };
  return (
    <>
      <GoalsTabList onGoalTypeSelected={goalTypeSelectedHandler}></GoalsTabList>
      <GoalList selectedGoalType={selectedGoalType}></GoalList>
    </>
  );
};

export default AllGoals;
