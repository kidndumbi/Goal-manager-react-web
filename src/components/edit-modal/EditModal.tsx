import { PropsWithChildren } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { Formik } from "formik";

import "react-datepicker/dist/react-datepicker.css";
import { EditModalSchema } from "./validators";
import React from "react";

type EditModalProps = {
  showModal: boolean;
  onCloseModal: () => void;
  onSaveChanges: (data: any) => void;
  dataToEdit: { data: any; type: string };
};

//Cassava
const CustomInput = React.forwardRef((props: any, ref: any) => {
  return (
    <button type="button" onClick={props.onClick} ref={ref}>
      {props.value || props.placeholder}
    </button>
  );
});

const EditModal = (props: PropsWithChildren<EditModalProps>) => {
  const { data } = props.dataToEdit;
  const mainDuedate = props.dataToEdit.data.dueDate;

  const statusOptions = useSelector(
    (state: any) => state.statusOptions.options
  );

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
            }}
            validationSchema={EditModalSchema({ mainDuedate })}
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
              errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    placeholder="Enter name"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    <span style={{ color: "red" }}>{errors.name}</span>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Due Date</Form.Label>
                  <DatePicker
                    selected={values.dueDate}
                    name="dueDate"
                    onChange={(value) => {
                      setFieldValue("dueDate", value);
                    }}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    customInput={<CustomInput />}
                  />
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
                <Form.Group>
                  <Button
                    variant="primary"
                    className="mt-3 float-end"
                    type="submit"
                    disabled={!isValid}
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
