import { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoalsTabList from "../../components/goals-tabs/GoalsTabList";
import GoalList from "../../components/goals/GoalsList";
import { currentPageActions } from "../../store";

interface Props {

}
const AllGoals = (props: PropsWithChildren<Props>) => {
  const [selectedGoalType, setSelectedGoalType] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentPageActions.setCurrentPage({ currentPage: "MainPage" }));
  }, []);

  const goalTypeSelectedHandler = (selected: any) => {
    setSelectedGoalType(selected);
  };
  return (
    <>
      <GoalsTabList onGoalTypeSelected={goalTypeSelectedHandler}></GoalsTabList>
      <GoalList
        selectedGoalType={selectedGoalType}
      ></GoalList>
    </>
  );
};

export default AllGoals;
