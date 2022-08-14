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
import { selectSearchValue } from "../../store/search.slice";
import { useGetGoalsQuery } from "../../store/api/goalsApi";
import { triggerToast } from "../../store/toasts.slice";
import { useAppDispatch } from "../../store";

interface Props {
  selectedGoalType: string;
}

const GoalList = ({ selectedGoalType: type }: PropsWithChildren<Props>) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: goalsData, error, isLoading } = useGetGoalsQuery();

  useEffect(() => {
    if (error) {
      dispatch(
        triggerToast({
          header: "Error",
          bodyText: "There was an error retrieving goals.",
          backgroundColor: "danger",
        })
      );
    }
  }, [error, dispatch]);

  const [goalsInfo, dispatchGoalsData] = useReducer(goalsReducer, goalsData);
  const searchValue = useSelector(selectSearchValue);

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
      {isLoading && (
        <Loading
          className="pt-3 "
          style={{ width: "3rem", height: "3rem" }}
          text="Please Wait..."
        ></Loading>
      )}
      {goalsInfo &&
        goalsInfo.map((goal: GoalModel) => {
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
