import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import NavBar from "./components/nav-bar/NavBar";
import { GoalsTabsContext } from "./contexts/goalsTabs.context";
import { GoalsContext } from "./contexts/goals.context";
import AllGoals from "./pages/all-goals/AllGoals";
import { GoalTabModel } from "./models/GoalTabModel.interface";
import { GoalModel } from "./models/GoalModel.interface";
import { Routes, Route } from "react-router-dom";
import { EditGoal } from "./pages/edit-goal/EditGoal";
import { AddGoal } from "./pages/add-goal/AddGoal";
import { CurrentPageContext } from "./contexts/currentPage.context";
import { Reports } from "./pages/reports/reporst";
import { useHttp } from "./hooks/use-http.hook";

function App() {
  /// GOLABAL DATA
  const [goalsData, setGoalsdata] = useState<GoalModel[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState("MainPage");
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

  const { sendRequest } = useHttp({url:"https://whispering-headland-62985.herokuapp.com/goals-manager/goals" }, (data: GoalModel[]) => {
      setGoalsdata(data);
  }, (err: any) => { console.log('ERRRROR happend', err) });

  const onSearchHandler = (value: any) => {
    setSearchValue(value);
  };
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <>
      <GoalsContext.Provider value={{ goalsData }}>
        <GoalsTabsContext.Provider value={{ goalsTabs, setGoalsTabs }}>
          <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            <NavBar onSearch={onSearchHandler}></NavBar>
            <div
              className={`${classes.App} container`}
              style={{ paddingTop: "40px" }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<AllGoals searchValue={searchValue} />}
                />
                <Route path="editGoal/:id" element={<EditGoal />} />
                <Route path="addGoal" element={<AddGoal />} />
                <Route path="reports" element={<Reports />} />
              </Routes>
            </div>
          </CurrentPageContext.Provider>
        </GoalsTabsContext.Provider>
      </GoalsContext.Provider>
    </>
  );
}
export default App;
