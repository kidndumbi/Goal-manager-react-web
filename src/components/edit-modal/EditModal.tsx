import { PropsWithChildren } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { EditModalSchema } from "./validators";
import { DatePickerWrapper } from "../date-picker/DatePickerWrapper";
import { selectStatusOptions } from "../../store/statusOptions.slice";

type EditModalProps = {
  showModal: boolean;
  onCloseModal: () => void;
  onSaveChanges: (data: any) => void;
  dataToEdit: {
    data: any;
    type: string;
    goalDueDate: number | null | undefined;
  };
};

const EditModal = (props: PropsWithChildren<EditModalProps>) => {
  const { data, goalDueDate } = props.dataToEdit;

  const statusOptions = useSelector(selectStatusOptions);

  return (
    <>
      <Modal show={props.showModal} onHide={props.onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: data.name,
              dueDate: data.dueDate,
              status: data.status,
              notes: data.notes || "",
            }}
            validationSchema={EditModalSchema({
              goalDueDate,
              dataToEditType: props.dataToEdit.type,
            })}
            onSubmit={(formData, { setSubmitting }) => {
              props.onSaveChanges({
                data: {
                  ...data,
                  ...formData,
                  dueDate: new Date(formData.dueDate).getTime(),
                },
                type: props.dataToEdit.type,
              });
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              resetForm,
              setFieldValue,
              isValid,
              dirty,
              errors,
              getFieldProps,
            }) => (
              <Form onSubmit={handleSubmit}>
                {props.dataToEdit.type !== "new-objective" && (
                  <Form.Group>
                    <div className="pt-2">
                      <strong>Created On: </strong>
                      <span>
                        <Moment format="dddd Do MMMM YYYY h:mm A">
                          {data?.createDate}
                        </Moment>
                      </span>
                    </div>
                  </Form.Group>
                )}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    placeholder="Enter name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Text className="text-muted">
                    <span style={{ color: "red" }}>{errors.name}</span>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Due Date</Form.Label>
                  <DatePickerWrapper
                    {...getFieldProps("dueDate")}
                  ></DatePickerWrapper>
                  <Form.Text className="text-muted">
                    <span style={{ color: "red" }}>{errors.dueDate}</span>
                  </Form.Text>
                </Form.Group>

                {props.dataToEdit.type !== "new-objective" && (
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      id="edit-goal-status"
                      className="form-control"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoFocus={true}
                    >
                      {statusOptions.map(
                        (status: { name: string; value: string }) => {
                          return (
                            <option key={status.value} value={status.value}>
                              {" "}
                              {status.name}{" "}
                            </option>
                          );
                        }
                      )}
                    </Form.Select>
                  </Form.Group>
                )}

                <FloatingLabel
                  controlId="floatingTextarea2"
                  className="mt-2"
                  label="Notes"
                >
                  <Form.Control
                    as="textarea"
                    name="notes"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    value={values?.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FloatingLabel>

                <Form.Group>
                  <Button
                    variant="primary"
                    className="mt-3 float-end"
                    type="submit"
                    disabled={!isValid || !dirty}
                  >
                    Save Changes
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export { EditModal };
