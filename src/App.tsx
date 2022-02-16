import React from "react";
import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import NavBar from "./components/nav-bar/NavBar";
import { GoalsTabsContext } from "./contexts/goalsTabs.context";
import { GoalsContext } from "./contexts/goals.context";
import AllGoals from "./pages/all-goals/AllGoals";
import { SearchedValueContext } from "./contexts/searchedValue.context";

function App() {
  /// GOLABAL DATA
  const [goalsData, setGoalsdata] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [goalsTabs, setGoalsTabs] = useState([
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


  useEffect(() => {
    fetch("https://whispering-headland-62985.herokuapp.com/goals-manager/goals")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => {
        console.log("goals = ", data);
        setGoalsdata(data);
      });
  }, []);

  return (
    <>
      <GoalsContext.Provider value={{ goalsData }}>
        <GoalsTabsContext.Provider value={{ goalsTabs, setGoalsTabs }}>
          <SearchedValueContext.Provider value={{ searchValue, setSearchValue }}>
            <NavBar ></NavBar>

            <div
              className={`${classes.App} container`}
              style={{ paddingTop: "40px" }}
            >
              <AllGoals  />
            </div>
          </SearchedValueContext.Provider>
        </GoalsTabsContext.Provider>
      </GoalsContext.Provider>
    </>
  );
}

export default App;
