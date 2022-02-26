import { PropsWithChildren, useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { GoalModel } from "../../models/GoalModel.interface";
import { currentPageActions } from "../../store/currentPage";
import { Button } from "react-bootstrap";
import { Objective } from "../../components/objective/Objective";
import { ObjectiveModel } from "../../models/ObjectiveModel.interface";
import { EditModal } from "../../components/edit-modal/EditModal";
import { goalsActions } from "../../store/goals";

interface EditGoalProps {}

const EditGoal = (props: PropsWithChildren<EditGoalProps>) => {
  const params = useParams();

  const statusOptions = useSelector(
    (state: any) => state.statusOptions.options
  );

  const dispatch = useDispatch();

  const [goal, setGoal] = useState<GoalModel>();

  const [dataToEdit, setDataToEdit] = useState<{ data: any; type: string }>({
    data: {},
    type: "",
  });

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

  const [showEditModal, setshowEditModal] = useState(false);

  const handleCloseEditModal = () => {
    setshowEditModal(false);
  };
  const handleShowEditModal = () => setshowEditModal(true);

  const markedFordeleteHandler = (objective: ObjectiveModel) => {
    const objectiveClone = goal?.objectives
      ? JSON.parse(JSON.stringify(goal.objectives))
      : [];
    objectiveClone.forEach((objectiveC: ObjectiveModel) => {
      if (objective.id === objectiveC.id) {
        objectiveC.markedForDeletion = !objectiveC.markedForDeletion;
      }
    });

    setGoal((prevState: any) => {
      return {
        ...prevState,
        objectives: objectiveClone,
      };
    });
  };

  const onObjectiveEdithandler = (objective: ObjectiveModel) => {
    setDataToEdit({ data: objective, type: "objective" });
    handleShowEditModal();
  };

  const onGoalHeaderEdithandler = () => {
    setDataToEdit({ data: goal, type: "goalHeaders" });
    handleShowEditModal();
  };

  const onSaveEditChangesHandler = (modifiedData: any) => {
    setshowEditModal(false);

    if (modifiedData.type === "objective") {
      const objectiveClone = goal?.objectives
        ? JSON.parse(JSON.stringify(goal.objectives))
        : [];
      objectiveClone.forEach((objectiveC: ObjectiveModel) => {
        if (modifiedData.data.id === objectiveC.id) {
          objectiveC.markedForUpdate = true;
          objectiveC.dueDate = modifiedData.data.dueDate;
          objectiveC.name = modifiedData.data.name;
          objectiveC.status = modifiedData.data.status;
        }
      });
      setGoal((prevState: any) => {
        return {
          ...prevState,
          objectives: objectiveClone,
        };
      });
      return;
    } else if (modifiedData.type === "goalHeaders") {
      //console.log("update goal headers here!");
      const { dueDate, name, status } = modifiedData.data;
      setGoal((prevState: any) => {
        return {
          ...prevState,
          dueDate,
          name,
          status,
        };
      });
    }

  };

  return (
    <>
      <EditModal
        showModal={showEditModal}
        onCloseModal={handleCloseEditModal}
        onSaveChanges={onSaveEditChangesHandler}
        dataToEdit={dataToEdit}
      ></EditModal>
      <Link to="/">
        <Button variant="outline-primary">{"Back"}</Button>
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
        <div>
          <strong>Status: </strong>
          {statusOptions.find((stat: any) => stat.value === goal?.status)?.name}
        </div>
        <div className="pt-2 pb-2">
          <strong>Created On: </strong>
          <span>
            <Moment format="dddd Do MMMM YYYY h:mm A">
              {goal?.createDate}
            </Moment>
          </span>
        </div>
        <div>
          <Button variant="primary" onClick={onGoalHeaderEdithandler}>
            Edit
          </Button>
        </div>
      </div>
      <div className="pt-4" style={{ color: "#0d6efd" }}>
        <h3>Objectives</h3>
      </div>
      <hr></hr>
      <div>
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
      </div>
      <div className="d-grid gap-2 mb-4">
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            dispatch(goalsActions.updateGoal(goal));
          }}
        >
          Update
        </Button>
      </div>
    </>
  );
};

export { EditGoal };
