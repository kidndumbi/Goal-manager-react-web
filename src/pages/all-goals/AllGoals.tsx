import { PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GoalsTabList from "../../components/goals-tabs/GoalsTabList";
import GoalList from "../../components/goals/GoalsList";
import { MassUpdate } from "../../components/mass-update/MassUpdate";
import { useAppDispatch } from "../../store";
import { currentPageActions } from "../../store/currentPage.slice";
import {
  massUpdateActions,
  selectMassUpdateIds,
} from "../../store/massUpdate.slice";
import { AppTranstion } from "../../components/app-transition/AppTransition";

interface Props {}
const AllGoals = (props: PropsWithChildren<Props>) => {
  const [selectedGoalType, setSelectedGoalType] = useState("");
  const dispatch = useAppDispatch();

  const massUpdateIds = useSelector(selectMassUpdateIds);

  useEffect(() => {
    return () => {
      dispatch(massUpdateActions.clearMassUpdateIds());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(currentPageActions.setCurrentPage({ currentPage: "MainPage" }));
  }, []);

  const goalTypeSelectedHandler = (selected: any) => {
    setSelectedGoalType(selected);
  };
  return (
    <>
      <GoalsTabList onGoalTypeSelected={goalTypeSelectedHandler}></GoalsTabList>
      <div className="pt-2">
        <AppTranstion show={massUpdateIds.length > 0}>
          <MassUpdate></MassUpdate>
        </AppTranstion>
      </div>
      <GoalList selectedGoalType={selectedGoalType}></GoalList>
    </>
  );
};

export default AllGoals;
