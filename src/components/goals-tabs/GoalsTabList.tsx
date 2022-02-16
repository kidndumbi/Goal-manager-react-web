import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { GoalsContext } from "../../contexts/goals.context";
import { GoalsTabsContext } from "../../contexts/goalsTabs.context";
import { GoalTabModel } from "../../models/GoalTabModel";
import GoalsTabItem from "./GoalsTabItem";

/* eslint-disable jsx-a11y/anchor-is-valid */

interface Props {
  onGoalTypeSelected: Function;
}

const GoalsTabList = (props: PropsWithChildren<Props>) => {
  const { goalsData } = useContext<any>(GoalsContext);
  const { goalsTabs, setGoalsTabs } = useContext<any>(GoalsTabsContext);

  useEffect(() => {
    const tabsClone = [...goalsTabs];

    tabsClone.forEach((tab) => {
      if (tab.name === "ALL") {
        tab["count"] = goalsData.length;
      } else {
        const filteredData = goalsData.filter(
          (g: any) => g.status === tab.name
        );
        tab["count"] = filteredData ? filteredData.length : 0;
      }
    });

    setGoalsTabs(tabsClone);
  }, [goalsData]);

  useEffect(() => {
    console.log("goalsTabs", goalsTabs);
    props.onGoalTypeSelected(
      goalsTabs.find((g: any) => g.active === true).name
    );
  }, [goalsTabs]);

  const activeTabChangeHandler = (tab: any) => {
    const goalsTabsClone = [...goalsTabs];

    goalsTabsClone.forEach((g) => {
      if (g.name === tab.name) {
        g.active = true;
      } else {
        g.active = false;
      }
    });

    setGoalsTabs(goalsTabsClone);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        {goalsTabs.map((tab: any) => {
          return (
            <GoalsTabItem
              key={tab.name}
              tabName={tab.name}
              background={tab.background}
              count={tab.count}
              className={`${tab.active === true ? "active" : ""} `}
              onClick={activeTabChangeHandler.bind(null, tab)}
            ></GoalsTabItem>
          );
        })}
      </ul>
    </div>
  );
};

export default GoalsTabList;
