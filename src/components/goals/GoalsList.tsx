import { PropsWithChildren, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalItem from "./GoalItem";
import { goalsReducer } from "./reducers";

interface Props {
  selectedGoalType: string;
}

const GoalList = ({ selectedGoalType: type }: PropsWithChildren<Props>) => {

  const navigate = useNavigate()

  const goalsData = useSelector((state: any) => state.goals.goals);

  const [goalsInfo, dispatchGoalsData] = useReducer(goalsReducer, goalsData);
  const searchValue = useSelector(
    (state: any) => state.searchValue.searchValue
  );

  const editHandler = (id: string) => {
      navigate(`/editGoal/${id}`)
  };

  useEffect(() => {
    dispatchGoalsData({
      type,
      goalsData,
      searchValue,
    });
  }, [type, goalsData, searchValue]);

  return (
    <>
      {goalsInfo.map((goal: any) => {
        return (
          <GoalItem
            key={goal.id}
            goal={goal}
            onEdit={editHandler}
            className="mt-3"
          ></GoalItem>
        );
      })}
    </>
  );
};

export default GoalList;
