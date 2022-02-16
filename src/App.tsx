import React from 'react';
import { useEffect, useState } from "react";
import classes from "./App.module.scss";
import NavBar from "./components/nav-bar/NavBar";
import AllGoals from "./pages/all-goals/AllGoals";

function App() {
  const [goalsData, setGoalsdata] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const onSearchHandler = (value: any) => {
    console.log('serch value = ', value);
    setSearchValue(value);
  }

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
      <NavBar onSearch={onSearchHandler}></NavBar>

      <div className={`${classes.App} container`} style={{ paddingTop: "40px" }}>
        <AllGoals goalsData={goalsData} searchValue={searchValue}/>
      </div>
    </>
  );
}

export default App;
