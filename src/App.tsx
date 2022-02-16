import React from "react";
import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import NavBar from "./components/nav-bar/NavBar";
import { GoalsTabsContext } from "./contexts/goalsTabs.context";
import { GoalsContext } from "./contexts/goals.context";
import AllGoals from "./pages/all-goals/AllGoals";
import { GoalTabModel } from "./models/GoalTabModel.interface";
import { GoalModel } from "./models/GoalModel.interface";

function App() {
  /// GOLABAL DATA
  const [goalsData, setGoalsdata] = useState<GoalModel[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [goalsTabs, setGoalsTabs] = useState<GoalTabModel[]>([
    { name: "ALL", background: "bg-secondary", count: 0, title: "All Tasks", active: false },
    {
      name: "IN_PROGRESS",
      background: "bg-primary",
      count: 0,
      title: "Tasks in Progress",
      active: true
    },
    {
      name: "COMPLETE",
      background: "bg-success",
      count: 0,
      title: "Completed Tasks",
      active: false
    },
    {
      name: "FAILED",
      background: "bg-danger",
      count: 0,
      title: "Failed Tasks",
      active: false
    },
  ]);

  const onSearchHandler = (value: any) => {
    console.log("serch value = ", value);
    setSearchValue(value);
  };

  useEffect(() => {
    fetch("https://whispering-headland-62985.herokuapp.com/goals-manager/goals")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data: GoalModel[]) => {
        console.log("goals = ", data);
        setGoalsdata(data);
      });
  }, []);

  return (
    <>
      <GoalsContext.Provider value={{ goalsData }}>
        <GoalsTabsContext.Provider value={{goalsTabs, setGoalsTabs}}>
          <NavBar onSearch={onSearchHandler}></NavBar>

          <div
            className={`${classes.App} container`}
            style={{ paddingTop: "40px" }}
          >
            <AllGoals searchValue={searchValue} />
          </div>
        </GoalsTabsContext.Provider>
      </GoalsContext.Provider>
    </>
  );
}

export default App;
