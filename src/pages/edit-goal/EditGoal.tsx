import { v4 as uuidv4 } from "uuid";
import { PropsWithChildren, useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoalModel } from "../../models/GoalModel.interface";
import { currentPageActions } from "../../store/currentPage";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { Objective } from "../../components/objective/Objective";
import { ObjectiveModel } from "../../models/ObjectiveModel.interface";
import { EditModal } from "../../components/edit-modal/EditModal";
import { goalsActions } from "../../store/goals";
import { ConfirmModal } from "../../components/confirm-modal/ConfirmModal";
import * as yup from "yup";
import { RootState, useAppDispatch } from "../../store";

interface EditGoalProps {}

const EditGoal = (props: PropsWithChildren<EditGoalProps>) => {
  const navigate = useNavigate();
  const params = useParams();

  const statusOptions = useSelector(
    (state: RootState) => state.statusOptions.options
  );

  const dispatch = useAppDispatch();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>();
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  useEffect(() => {
    dispatch(currentPageActions.setCurrentPage({ currentPage: "EditGoal" }));
  }, []);

  const [goal, setGoal] = useState<GoalModel>();
  useEffect(() => {
    goal && updateFormValidity();
  }, [goal]);

  const [dataToEdit, setDataToEdit] = useState<{
    data: any;
    type: string;
    goalDueDate: number | null | undefined;
  }>({
    data: {},
    type: "",
    goalDueDate: null,
  });

  const filteredGoal = useSelector((state: RootState) =>
    state.goals.goals.find((goal: GoalModel) => goal.id === params.id)
  );
  useEffect(() => {
    if (filteredGoal) {
      if (filteredGoal?.notes === null) filteredGoal.notes = "";
      if (filteredGoal?.objectives === null) filteredGoal.objectives = [];
      setGoal(filteredGoal);
    }
  }, [filteredGoal]);

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
      goalDueDate: goal?.dueDate,
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
      goalDueDate: goal?.dueDate,
    });

    handleShowEditModal();
  };

  const onGoalHeaderEdithandler = () => {
    setDataToEdit({
      data: goal,
      type: "goalHeaders",
      goalDueDate: goal?.dueDate,
    });
    handleShowEditModal();
  };

  const onSaveEditChangesHandler = (modifiedData: any) => {
    setshowEditModal(false);

    setIsFormDirty(true);

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
          objectiveC.notes = modifiedData.data.notes;
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
            objectiveC.notes = modifiedData.data.notes;
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
    notes: yup
      .string()
      .when("status", (status, field) =>
        status === "FAILED" ? field.required() : field
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
          onOk={async () => {
            setShowDeleteConfirmModal(false);
            dispatch(
              goalsActions.deleteGoal({
                id: goal?.id,
              })
            ).then(() => navigate("/"));
          }}
          bodytext="Are you sure you want to Delete?"
        ></ConfirmModal>
      )}

      <Link to="/">
        <Button variant="outline-primary" aria-label="Back">
          <i className="bi bi-arrow-left-circle-fill"></i>
        </Button>
      </Link>

      <div className="d-flex justify-content-between pt-2">
        <h2>{goal?.name}</h2>
        <Button
          aria-label="delete goal"
          variant="danger"
          onClick={() => {
            setShowDeleteConfirmModal(true);
          }}
        >
          <i className="me-1 bi bi-trash"></i>
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
          <Button
            variant="primary"
            aria-label="Edit Goal"
            onClick={onGoalHeaderEdithandler}
          >
            <i className="bi bi-pencil-square"></i>
          </Button>
        </div>
      </div>
      <div className="pt-4" style={{ color: "#0d6efd" }}>
        <div className="d-flex justify-content-between pt-2">
          <h3>Objectives</h3>
          <Button
            aria-label="add new objective"
            variant="outline-success"
            onClick={addNewObjectiveHandler}
          >
            <i className="bi bi-plus-circle-fill"></i>
          </Button>
        </div>
      </div>
      <hr></hr>
      <div>
        {goal &&
          goal.objectives &&
          goal?.objectives.map((objective: ObjectiveModel) => {
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
      <div>
        <FloatingLabel controlId="floatingTextarea2" label="Notes">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            value={goal?.notes}
            onChange={(event: any) => {
              setGoal((prevState: any) => {
                return {
                  ...prevState,
                  notes: event.target.value,
                };
              });
            }}
          />
        </FloatingLabel>
        {formErrors?.notes && (
          <div className="mt-2">
            <Alert variant="danger">{formErrors?.notes}</Alert>
          </div>
        )}
      </div>
      <div className="d-grid gap-2 mb-4 pt-3">
        <Button
          variant="primary"
          size="lg"
          onClick={async () => {
            try {
              await dispatch(goalsActions.updateGoal(goal));
              navigate("/");
            } catch (error) {}
          }}
          disabled={!isFormValid || !isFormDirty}
        >
          Update
        </Button>
      </div>
    </>
  );
};

export { EditGoal };
