import { PropsWithChildren, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalItem from "./GoalItem";
import { Loading } from "../loading/Loading";
import { goalsReducer } from "./reducers";
import classes from "./GoalsList.module.scss";
import {
  checkIfDateGreater,
  checkIfDatesAreEqual,
} from "../../utils/dateTimeHelpers";
import { GoalModel } from "../../models/GoalModel.interface";

interface Props {
  selectedGoalType: string;
}

const GoalList = ({ selectedGoalType: type }: PropsWithChildren<Props>) => {
  const navigate = useNavigate();

  const goalsData = useSelector((state: any) => state.goals.goals);
  const loadingGoals = useSelector((state: any) => state.goals.loading);

  const [goalsInfo, dispatchGoalsData] = useReducer(goalsReducer, goalsData);
  const searchValue = useSelector(
    (state: any) => state.searchValue.searchValue
  );

  const editHandler = (id: string) => {
    navigate(`/editGoal/${id}`);
  };

  useEffect(() => {
    dispatchGoalsData({
      type,
      goalsData,
      searchValue,
    });
  }, [type, goalsData, searchValue]);

  const getGoalItemColor = (goal: GoalModel) => {
    if (checkIfDateGreater(new Date(), new Date(goal.dueDate!))) {
      return classes.pastDue;
    }

    if (checkIfDatesAreEqual(new Date(goal.dueDate!), new Date())) {
      return classes.dueToday;
    }

    return "";
  };

  return (
    <>
      {loadingGoals && (
        <Loading
          className="pt-3 "
          style={{ width: "3rem", height: "3rem" }}
          text="Please Wait..."
        ></Loading>
      )}
      {goalsInfo.map((goal: GoalModel) => {
        return (
          <GoalItem
            key={goal.id}
            goal={goal}
            onEdit={editHandler}
            className={`mt-3 ${getGoalItemColor(goal)}`}
          ></GoalItem>
        );
      })}
    </>
  );
};

export default GoalList;
