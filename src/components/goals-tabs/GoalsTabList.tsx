import { PropsWithChildren, useContext, useEffect } from "react";
import { GoalsTabsContext } from "../../contexts/goalsTabs.context";
import { useGetGoalsQuery } from "../../store/api/goalsApi";
import GoalsTabItem from "./GoalsTabItem";

interface Props {
  onGoalTypeSelected: Function;
}

const GoalsTabList = (props: PropsWithChildren<Props>) => {
  const { data: goalsData = [] } = useGetGoalsQuery();

  const { goalsTabs, setGoalsTabs } = useContext(GoalsTabsContext);

  useEffect(() => {
    if (goalsData.length === 0) {
      return;
    }

    const tabsClone = [...goalsTabs];

    tabsClone.forEach((tab) => {
      if (tab.name === "ALL") {
        tab["count"] = goalsData?.length;
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
    props.onGoalTypeSelected(
      goalsTabs.find((g: any) => g.active === true)?.name
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
      <ul className="nav nav-tabs justify-content-center">
        {goalsTabs.map((tab) => {
          return (
            <GoalsTabItem
              icon={tab.icon}
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
