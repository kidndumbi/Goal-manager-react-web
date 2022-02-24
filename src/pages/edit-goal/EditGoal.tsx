import { PropsWithChildren, useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GoalModel } from "../../models/GoalModel.interface";
import { currentPageActions } from "../../store/currentPage";

interface EditGoalProps {}

const EditGoal = (props: PropsWithChildren<EditGoalProps>) => {
  const params = useParams();

  const statusOptions = useSelector(
    (state: any) => state.statusOptions.options
  );

  useEffect(() => {
    console.log("statusOptions", statusOptions);
  });

  const dispatch = useDispatch();

  const [goal, setGoal] = useState<GoalModel>();

  const goalsData = useSelector((state: any) => state.goals.goals);

  useEffect(() => {
    dispatch(currentPageActions.setCurrentPage({ currentPage: "EditGoal" }));
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
      <Link to="/">
        <button className="btn btn-primary" type="button">
          {"Back"}
        </button>
      </Link>

      <div className="d-flex justify-content-between pt-2">
        <h2>{goal?.name}</h2>
        <button className="btn btn-danger" type="button">
          Delete
        </button>
      </div>
      <hr />
      <div>
        <div className="pb-2">
          <strong>Due Date: </strong>
          <span>
            <Moment format="dddd Do MMMM YYYY h:mm A">{goal?.dueDate}</Moment>
          </span>
        </div>
        <label htmlFor="edit-goal-status">
          {" "}
          <strong>Status</strong>{" "}
        </label>
        <select
          id="edit-goal-status"
          className="form-control"
          value={goal?.status}
          autoFocus={true}
        >
          {statusOptions.map((status: { name: string; value: string }) => {
            return <option value={status.value}> {status.name} </option>;
          })}
        </select>
        <div className="pt-2">
          <strong>Created On: </strong>
          <span>
            <Moment format="dddd Do MMMM YYYY h:mm A">
              {goal?.createDate}
            </Moment>
          </span>
        </div>
      </div>
    </>
  );
};

export { EditGoal };
