import { v4 as uuidv4 } from "uuid";
import { PropsWithChildren, useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { EditModal } from "../../components/edit-modal/EditModal";
import { Objective } from "../../components/objective/Objective";
import { ObjectiveModel } from "../../models/ObjectiveModel.interface";
import { currentPageActions } from "../../store/currentPage.slice";
import { goalsActions } from "../../store/goals.slice";
import { FieldArray, Formik } from "formik";
import { DatePickerWrapper } from "../../components/date-picker/DatePickerWrapper";
import { useAppDispatch } from "../../store";

interface AddGoalProps {}

const AddGoal = (props: PropsWithChildren<AddGoalProps>) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  let formik: any;

  useEffect(() => {
    dispatch(currentPageActions.setCurrentPage({ currentPage: "AddGoal" }));
  }, []);

  const [dataToEdit, setDataToEdit] = useState<{
    data: any;
    type: string;
    goalDueDate: number | null | undefined;
  }>({
    data: {},
    type: "",
    goalDueDate: null,
  });

  const [showEditModal, setshowEditModal] = useState(false);

  const handleCloseEditModal = () => {
    setshowEditModal(false);
  };
  const handleShowEditModal = () => setshowEditModal(true);

  const onSaveEditChangesHandler = (modifiedData: any) => {
    const objectiveClone = [...formik.values.objectives];

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

    formik.setFieldValue("objectives", objectiveClone);
    setshowEditModal(false);
  };

  const addNewObjectiveHandler = () => {
    setDataToEdit({
      data: {
        dueDate: formik.values.dueDate,
        name: "",
        id: null,
        isNew: true,
        status: "IN_PROGRESS",
        markedForDeletion: false,
        markedForUpdate: true,
      },
      type: "new-objective",
      goalDueDate: formik.values.dueDate,
    });

    handleShowEditModal();
  };

  const markedFordeleteHandler = (objective: ObjectiveModel) => {
    let objectiveClone = [...formik.values.objectives];

    objectiveClone = objectiveClone.filter((o: ObjectiveModel) => {
      return o.tempIdForNew !== objective.tempIdForNew;
    });

    formik.setFieldValue("objectives", objectiveClone);
  };

  const onObjectiveEdithandler = (objective: ObjectiveModel) => {
    setDataToEdit({
      data: objective,
      type: "new-objective",
      goalDueDate: formik.values.dueDate,
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
        </Button>
      </Link>
      <hr />

      <Formik
        innerRef={(p) => (formik = p)}
        initialValues={{
          name: "",
          dueDate: new Date().getTime(),
          objectives: [],
          notes: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Required"),
          dueDate: Yup.string().nullable().required("Required"),
        })}
        onSubmit={(goal, { setSubmitting }) => {
          dispatch(
            goalsActions.createGoal({
              data: { ...goal, dueDate: new Date(goal.dueDate).getTime() },
            })
          ).then(() => navigate("/"));
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          isValid,
          errors,
          getFieldProps,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNamel">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                value={values.name}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                <span style={{ color: "red" }}>{errors.name}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDueDate">
              <Form.Label>Due date</Form.Label>
              <DatePickerWrapper
                {...getFieldProps("dueDate")}
              ></DatePickerWrapper>
              <Form.Text className="text-muted">
                <span style={{ color: "red" }}>{errors.dueDate}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <div className="pt-4" style={{ color: "#0d6efd" }}>
                <div className="d-flex justify-content-between pt-2">
                  <h3>Objectives</h3>
                  <Button
                    variant="outline-success"
                    onClick={addNewObjectiveHandler}
                  >
                    <i className="bi bi-plus-circle-fill"></i>
                  </Button>
                </div>
              </div>
              <hr></hr>
            </Form.Group>

            <Form.Group>
              <FieldArray name="objectives">
                {() =>
                  values.objectives.length > 0 &&
                  values.objectives.map((objective: ObjectiveModel) => {
                    return (
                      <Objective
                        key={objective.id}
                        className="mb-2"
                        onMarkedForDelete={markedFordeleteHandler.bind(
                          null,
                          objective
                        )}
                        onEdit={onObjectiveEdithandler.bind(null, objective)}
                        data={objective}
                      ></Objective>
                    );
                  })
                }
              </FieldArray>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="floatingTextarea2" label="Notes">
                <Form.Control
                  as="textarea"
                  name="notes"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                  value={values.notes}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>
            <Button
              variant="primary"
              size="lg"
              className="mt-3"
              type="submit"
              disabled={!isValid}
            >
              <i className="bi bi-plus-circle-fill me-1"></i>
              Add
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { AddGoal };
