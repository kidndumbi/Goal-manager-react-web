import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import NavBar from "./components/nav-bar/NavBar";
import { GoalsTabsContext } from "./contexts/goalsTabs.context";
import AllGoals from "./pages/all-goals/AllGoals";
import { GoalTabModel } from "./models/GoalTabModel.interface";
import { GoalModel } from "./models/GoalModel.interface";
import { Routes, Route } from "react-router-dom";
import { EditGoal } from "./pages/edit-goal/EditGoal";
import { AddGoal } from "./pages/add-goal/AddGoal";
import { Reports } from "./pages/reports/reporst";
import { useHttp } from "./hooks/use-http.hook";
import { useDispatch, useSelector } from "react-redux";

function App() {
  /// GOLABAL DATA

  const goalsData = useSelector((state: any) => state.goals);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("the goals data store ", goalsData);
  }, [goalsData]);

  const [goalsTabs, setGoalsTabs] = useState<GoalTabModel[]>([
    {
      name: "ALL",
      background: "bg-secondary",
      count: 0,
      title: "All Tasks",
      active: false,
    },
    {
      name: "IN_PROGRESS",
      background: "bg-primary",
      count: 0,
      title: "Tasks in Progress",
      active: true,
    },
    {
      name: "COMPLETE",
      background: "bg-success",
      count: 0,
      title: "Completed Tasks",
      active: false,
    },
    {
      name: "FAILED",
      background: "bg-danger",
      count: 0,
      title: "Failed Tasks",
      active: false,
    },
  ]);

  const { sendRequest } = useHttp(
    {
      url: "https://whispering-headland-62985.herokuapp.com/goals-manager/goals",
    },
    (data: GoalModel[]) => {
      dispatch({ type: "GET_ALL_GOALS", payload: { goals: data } });
    },
    (err: any) => {
      console.log("ERRRROR happend", err);
    }
  );

  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <>
      <GoalsTabsContext.Provider value={{ goalsTabs, setGoalsTabs }}>
        <NavBar ></NavBar>
        <div
          className={`${classes.App} container`}
          style={{ paddingTop: "40px" }}
        >
          <Routes>
            <Route path="/" element={<AllGoals  />} />
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
