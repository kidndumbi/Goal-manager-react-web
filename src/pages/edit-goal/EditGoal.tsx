import { v4 as uuidv4 } from "uuid";
import { PropsWithChildren, useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoalModel } from "../../models/GoalModel.interface";
import { currentPageActions } from "../../store/currentPage";
import { Alert, Button } from "react-bootstrap";
import { Objective } from "../../components/objective/Objective";
import { ObjectiveModel } from "../../models/ObjectiveModel.interface";
import { EditModal } from "../../components/edit-modal/EditModal";
import { goalsActions } from "../../store/goals";
import { ConfirmModal } from "../../components/confirm-modal/ConfirmModal";
import * as yup from "yup";

interface EditGoalProps {}

const EditGoal = (props: PropsWithChildren<EditGoalProps>) => {
  const navigate = useNavigate();
  const params = useParams();

  const statusOptions = useSelector(
    (state: any) => state.statusOptions.options
  );

  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>();

  useEffect(() => {
    dispatch(currentPageActions.setCurrentPage({ currentPage: "EditGoal" }));
  }, []);

  const [goal, setGoal] = useState<GoalModel>();
  useEffect(() => {
    console.log("goal data change", goal);
    goal && updateFormValidity();
  }, [goal]);

  const [dataToEdit, setDataToEdit] = useState<{ data: any; type: string }>({
    data: {},
    type: "",
  });

  const goalsData = useSelector((state: any) => state.goals.goals);
  useEffect(() => {
    const filteredGoal = goalsData.filter((g: any) => g.id === params.id);
    setGoal(filteredGoal[0]);
  }, [goalsData]);

  const [showEditModal, setshowEditModal] = useState(false);

  const handleCloseEditModal = () => {
    setshowEditModal(false);
  };
  const handleShowEditModal = () => setshowEditModal(true);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const markedFordeleteHandler = (objective: ObjectiveModel) => {
    let objectiveClone = goal?.objectives
      ? JSON.parse(JSON.stringify(goal.objectives))
      : [];

    if (objective.isNew) {
      objectiveClone = objectiveClone.filter((o: ObjectiveModel) => {
        return o.tempIdForNew !== objective.tempIdForNew;
      });
    } else {
      objectiveClone.forEach((objectiveC: ObjectiveModel) => {
        if (objective.id === objectiveC.id) {
          objectiveC.markedForDeletion = !objectiveC.markedForDeletion;
        }
      });
    }

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
      type: objective.isNew ? "new-objective" : "objective",
    });
    handleShowEditModal();
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
    } else if (modifiedData.type === "new-objective") {

      const objectiveClone = goal?.objectives
        ? JSON.parse(JSON.stringify(goal.objectives))
        : [];

      // new objective that is already save in store so update in store
      if (modifiedData.data.tempIdForNew) {
        // not added to store so insert new record

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
    } else if (modifiedData.type === "goalHeaders") {
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

  const formSchema = yup.object().shape({
    objectives: yup.array(),
    status: yup
      .string()
      .required()
      .test(
        "objective-statuses",
        "All Objective statuses must also be in complete",
        function (value) {
          const objectives: any[] = (this.options as any).parent.objectives;

          if (objectives?.length === 0) return true;
          if (value !== "COMPLETE") return true;

          return (
            value === "COMPLETE" &&
            objectives.every((objective) => objective.status === "COMPLETE")
          );
        }
      ),
  });

  const updateFormValidity = () => {
    setFormErrors({});
    formSchema
      .isValid(goal, {
        abortEarly: false, // Prevent aborting validation after first error
      })
      .then((isValid) => {
        setIsFormValid(isValid);
        !isValid && updateFormErrors();
      });
  };

  const updateFormErrors = () => {
    let errors = {};
    setFormErrors(errors);

    formSchema.validate(goal, { abortEarly: false }).catch((err) => {
      errors = err.inner.reduce((acc: any, error: any) => {
        return {
          ...acc,
          [error.path]: error.message,
        };
      }, {});

      setFormErrors(errors);
    });
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

      {showDeleteConfirmModal && (
        <ConfirmModal
          showModal={showDeleteConfirmModal}
          onCloseModal={() => {
            setShowDeleteConfirmModal(false);
          }}
          onOk={() => {
            setShowDeleteConfirmModal(false);

            dispatch(
              goalsActions.deleteGoal(goal?.id, () => {
                navigate("/");
              })
            );
          }}
          bodytext="Are you sure you want to Delete?"
        ></ConfirmModal>
      )}

      <Link to="/">
        <Button variant="outline-primary">
          <i className="bi bi-arrow-left-circle-fill"></i>
          {" Back"}
        </Button>
      </Link>

      <div className="d-flex justify-content-between pt-2">
        <h2>{goal?.name}</h2>
        <Button
          variant="danger"
          onClick={() => {
            setShowDeleteConfirmModal(true);
          }}
        >
          Delete
        </Button>
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
          {formErrors?.status && (
            <Alert variant="danger">{formErrors?.status}</Alert>
          )}
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
        <div className="d-flex justify-content-between pt-2">
          <h3>Objectives</h3>
          <Button variant="outline-success" onClick={addNewObjectiveHandler}>
            <i className="bi bi-plus-circle-fill"></i>
            {" ADD"}
          </Button>
        </div>
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
          onClick={async () => {
            dispatch(goalsActions.updateGoal(goal));
          }}
          disabled={!isFormValid}
        >
          Update
        </Button>
      </div>
    </>
  );
};

export { EditGoal };
