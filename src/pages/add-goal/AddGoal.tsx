import { v4 as uuidv4 } from "uuid";
import { PropsWithChildren, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EditModal } from "../../components/edit-modal/EditModal";
import { Objective } from "../../components/objective/Objective";
import { GoalModel } from "../../models/GoalModel.interface";
import { ObjectiveModel } from "../../models/ObjectiveModel.interface";
import { currentPageActions } from "../../store/currentPage";
import { goalsActions } from "../../store/goals";
import DatePicker from "react-datepicker";

interface AddGoalProps {}

const AddGoal = (props: PropsWithChildren<AddGoalProps>) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(currentPageActions.setCurrentPage({ currentPage: "AddGoal" }));
  }, []);

  const [goal, setGoal] = useState<GoalModel>({
    name: "HI",
    dueDate: new Date().getTime(),
    objectives: [],
  });

  const [dataToEdit, setDataToEdit] = useState<{ data: any; type: string }>({
    data: {},
    type: "",
  });

  const [showEditModal, setshowEditModal] = useState(false);

  const handleCloseEditModal = () => {
    setshowEditModal(false);
  };
  const handleShowEditModal = () => setshowEditModal(true);

  const onSaveEditChangesHandler = (modifiedData: any) => {
    setshowEditModal(false);

    const objectiveClone = goal?.objectives
      ? JSON.parse(JSON.stringify(goal.objectives))
      : [];

    if (modifiedData.data.tempIdForNew) {
      objectiveClone.forEach((objectiveC: ObjectiveModel) => {
        if (modifiedData.data.tempIdForNew === objectiveC.tempIdForNew) {
          objectiveC.dueDate = modifiedData.data.dueDate;
          objectiveC.name = modifiedData.data.name;
        }
      });
    } else {
      objectiveClone.push({
        ...modifiedData.data,
        tempIdForNew: uuidv4(),
      });
    }

    setGoal((prevState: any) => {
      return {
        ...prevState,
        objectives: objectiveClone,
      };
    });
  };

  const addNewObjectiveHandler = () => {
    setDataToEdit({
      data: {
        dueDate: goal?.dueDate,
        name: "",
        id: null,
        isNew: true,
        status: "IN_PROGRESS",
        markedForDeletion: false,
        markedForUpdate: true,
      },
      type: "new-objective",
    });

    handleShowEditModal();
  };

  const markedFordeleteHandler = (objective: ObjectiveModel) => {
    let objectiveClone = goal?.objectives
      ? JSON.parse(JSON.stringify(goal.objectives))
      : [];

    objectiveClone = objectiveClone.filter((o: ObjectiveModel) => {
      return o.tempIdForNew !== objective.tempIdForNew;
    });

    setGoal((prevState: any) => {
      return {
        ...prevState,
        objectives: objectiveClone,
      };
    });
  };

  const onObjectiveEdithandler = (objective: ObjectiveModel) => {
    setDataToEdit({
      data: objective,
      type: "new-objective",
    });
    handleShowEditModal();
  };

  return (
    <>
      {showEditModal && (
        <EditModal
          showModal={showEditModal}
          onCloseModal={handleCloseEditModal}
          onSaveChanges={onSaveEditChangesHandler}
          dataToEdit={dataToEdit}
        ></EditModal>
      )}

      <Link to="/">
        <Button variant="outline-primary">
          <i className="bi bi-arrow-left-circle-fill"></i>
          {" Back"}
        </Button>
      </Link>
      <hr />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("form submitted");
          dispatch(
            goalsActions.createGoal(goal, () => {
              navigate("/");
            })
          );
        }}
      >
        <Form.Group className="mb-3" controlId="formNamel">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={goal.name}
            onChange={(e) => {
              setGoal((prevState: GoalModel) => {
                return {
                  ...prevState,
                  name: e.target.value,
                };
              });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDueDate">
          <Form.Label>Due date</Form.Label>
          <DatePicker
            className=""
            selected={goal.dueDate ? new Date(goal.dueDate) : new Date()}
            onChange={(date: any) => {
              setGoal((prevState: GoalModel) => {
                return {
                  ...prevState,
                  dueDate: date,
                };
              });
            }}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
          />
        </Form.Group>
        <Form.Group>
          <div className="pt-4" style={{ color: "#0d6efd" }}>
            {/* <h3>Objectives</h3> */}
            <div className="d-flex justify-content-between pt-2">
              <h3>Objectives</h3>
              <Button
                variant="outline-success"
                onClick={addNewObjectiveHandler}
              >
                <i className="bi bi-plus-circle-fill"></i>
                {" ADD"}
              </Button>
            </div>
          </div>
          <hr></hr>
        </Form.Group>
        <Form.Group>
          {goal?.objectives.map((objective: ObjectiveModel) => {
            return (
              <Objective
                key={objective.id}
                className="mb-2"
                onMarkedForDelete={markedFordeleteHandler.bind(null, objective)}
                onEdit={onObjectiveEdithandler.bind(null, objective)}
                data={objective}
              ></Objective>
            );
          })}
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </>
  );
};

export { AddGoal };
