import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CurrentPageContext } from "../../contexts/currentPage.context";
import { GoalModel } from "../../models/GoalModel.interface";

interface EditGoalProps {}

const EditGoal = (props: PropsWithChildren<EditGoalProps>) => {
  const params = useParams();

  const [goal, setGoal] = useState<GoalModel>();

  const { setCurrentPage } = useContext<any>(CurrentPageContext);

  const goalsData = useSelector((state: any) => state.goals);

  useEffect(() => {
    setCurrentPage("editGoal");
  }, []);

  useEffect(() => {
    const filteredGoal = goalsData.filter((g: any) => g.id === params.id);
    setGoal(filteredGoal[0]);
  }, [goalsData]);

  useEffect(() => {
    console.log("goal data", goal);
  }, [goal]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>{goal?.name}</h2>
        <button className="btn btn-danger" type="button">
          Delete
        </button>
      </div>
      <hr />
      <div>
        <label htmlFor="edit-goal-status"> Status </label>
        <select id="edit-goal-status" className="form-control" autoFocus={true}>
          <option value="1"> Option1 </option>
          <option value="2"> Option2 </option>
        </select>
      </div>
     
    </>
  );
};

export { EditGoal };
