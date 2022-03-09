import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import NavBar from "./components/nav-bar/NavBar";
import { GoalsTabsContext } from "./contexts/goalsTabs.context";
import AllGoals from "./pages/all-goals/AllGoals";
import { GoalTabModel } from "./models/GoalTabModel.interface";
import { Routes, Route } from "react-router-dom";
import { EditGoal } from "./pages/edit-goal/EditGoal";
import { AddGoal } from "./pages/add-goal/AddGoal";
import { Reports } from "./pages/reports/reporst";
import { useDispatch } from "react-redux";
import { goalsActions } from "./store/goals";
import { Toasts } from "./components/toasts/Toasts";

function App() {

  const dispatch = useDispatch();

  const [goalsTabs, setGoalsTabs] = useState<GoalTabModel[]>([
    {
      name: "ALL",
      background: "bg-secondary",
      count: 0,
      title: "All Tasks",
      active: false,
      icon: 'bi-globe'
    },
    {
      name: "IN_PROGRESS",
      background: "bg-primary",
      count: 0,
      title: "Tasks in Progress",
      active: true,
      icon: 'bi-cone-striped'
    },
    {
      name: "COMPLETE",
      background: "bg-success",
      count: 0,
      title: "Completed Tasks",
      active: false,
      icon: 'bi-emoji-sunglasses'
    },
    {
      name: "FAILED",
      background: "bg-danger",
      count: 0,
      title: "Failed Tasks",
      active: false,
      icon: 'bi-emoji-frown'
    },
  ]);

  useEffect(() => {
    dispatch(goalsActions.getGoals());
  }, []);
  return (
    <>
      <GoalsTabsContext.Provider value={{ goalsTabs, setGoalsTabs }}>
        <Toasts></Toasts>
        <NavBar></NavBar>

        <div
          className={`${classes.App} container`}
          style={{ paddingTop: "40px" }}
        >
          <Routes>
            <Route path="/" element={<AllGoals />} />
            <Route path="editGoal/:id" element={<EditGoal />} />
            <Route path="addGoal" element={<AddGoal />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </div>
      </GoalsTabsContext.Provider>
    </>
  );
}
export default App;
