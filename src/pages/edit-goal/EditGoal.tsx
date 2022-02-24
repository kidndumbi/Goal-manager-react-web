import { PropsWithChildren, useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GoalModel } from "../../models/GoalModel.interface";
import { currentPageActions } from "../../store/currentPage";
import { Button, Modal } from "react-bootstrap";
import { Objective } from "../../components/objective/Objective";

interface EditGoalProps {}

const EditGoal = (props: PropsWithChildren<EditGoalProps>) => {
  const params = useParams();

  const statusOptions = useSelector(
    (state: any) => state.statusOptions.options
  );

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Link to="/">
        <Button variant="primary">{"Back"}</Button>
      </Link>

      <div className="d-flex justify-content-between pt-2">
        <h2>{goal?.name}</h2>
        <Button variant="danger">Delete</Button>
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
      <div className="pt-4" style={{ color: "#0d6efd" }}>
        <h3>Objectives</h3>
      </div>
      <hr></hr>
      <div>
        {goal?.objectives.map((objective: any) => {
          return (
            <Objective
              key={objective.id}
              className="pb-2"
              onMarkedForDelete={() => {
                console.log("marked for deletion triggered", objective);
              }}
              onEdit={(objective) => {
                console.log("objective to edit", objective);
              }}
              data={objective}
            ></Objective>
          );
        })}
      </div>
      <div className="d-grid gap-2 mb-4">
        <Button variant="primary" size="lg">
          Update
        </Button>
      </div>
    </>
  );
};

export { EditGoal };
