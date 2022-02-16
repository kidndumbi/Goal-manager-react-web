import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { GoalsContext } from "../../contexts/goals.context";
import { GoalTabModel } from "../../models/GoalTabModel";
import GoalsTabItem from "./GoalsTabItem";

/* eslint-disable jsx-a11y/anchor-is-valid */

interface Props {
  onGoalTypeSelected: Function;
}


const GoalsTabList = (props: PropsWithChildren<Props>) => {


  const { goalsData } = useContext<any>(GoalsContext)

  const [tabs, setTabs] = useState<GoalTabModel[]>([
    { name: "ALL", background: "bg-secondary", count: 0, title: "All Tasks" },
    {
      name: "IN_PROGRESS",
      background: "bg-primary",
      count: 0,
      title: "Tasks in Progress",
    },
    {
      name: "COMPLETE",
      background: "bg-success",
      count: 0,
      title: "Completed Tasks",
    },
    {
      name: "FAILED",
      background: "bg-danger",
      count: 0,
      title: "Failed Tasks",
    },
  ]);

  useEffect(() => {
    const tabsClone = [...tabs];

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

    setTabs(tabsClone);
  }, [goalsData]);

  const [activeTab, setActiveTab] = useState<GoalTabModel | undefined>(
    tabs.find((t) => t.name === "IN_PROGRESS")
  );

  useEffect(() => {
    props.onGoalTypeSelected(activeTab?.name);
  }, [activeTab]);

  const activeTabChangeHandler = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        {tabs.map((tab) => {
          return (
            <GoalsTabItem
              key={tab.name}
              tabName={tab.name}
              background={tab.background}
              count={tab.count}
              className={`${activeTab?.name === tab.name ? "active" : ""} `}
              onClick={activeTabChangeHandler.bind(null, tab)}
            ></GoalsTabItem>
          );
        })}
      </ul>
    </div>
  );
};

export default GoalsTabList;
