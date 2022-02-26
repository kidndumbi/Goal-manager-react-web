import { PropsWithChildren, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

type EditModalProps = {
  showModal: boolean;
  onCloseModal: () => void;
  onSaveChanges: (data: any) => void;
  dataToEdit: { data: any; type: string };
};

const EditModal = (props: PropsWithChildren<EditModalProps>) => {
  const { data } = props.dataToEdit;

  const [dueDate, setDueDate] = useState(new Date());
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (data.dueDate !== undefined) {
      setDueDate(data.dueDate);
    }
    if (data.status !== undefined) {
      setStatus(data.status);
    }
    if (data.name !== undefined) {
      setName(data.name);
    }
  }, [data.dueDate, data.status, data.name]);

  const statusOptions = useSelector(
    (state: any) => state.statusOptions.options
  );

  return (
    <Modal show={props.showModal} onHide={props.onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div>
            <label htmlFor="edit-name">
              {" "}
              <strong>Name</strong>{" "}
            </label>
            <input
              className="form-control"
              id="edit-name"
              type="text"
              placeholder="enter name"
              value={name}
              onChange={({ target }) => {
                setName(target.value);
              }}
            ></input>
          </div>
          <div className="pb-2">
            <strong>Due Date: </strong>
            <DatePicker
              selected={dueDate}
              onChange={(date: any) => {
                setDueDate(date);
              }}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
            <span>
              <Moment format="dddd Do MMMM YYYY h:mm A">{data?.dueDate}</Moment>
            </span>
          </div>
          {props.dataToEdit.type !== "new-objective" && (
            <div>
              <label htmlFor="edit-goal-status">
                {" "}
                <strong>Status</strong>{" "}
              </label>
              <select
                id="edit-goal-status"
                className="form-control"
                value={status}
                onChange={({ target }) => {
                  setStatus(target.value);
                }}
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
              </select>
            </div>
          )}

          {props.dataToEdit.type !== "new-objective" && (
            <div className="pt-2">
              <strong>Created On: </strong>
              <span>
                <Moment format="dddd Do MMMM YYYY h:mm A">
                  {data?.createDate}
                </Moment>
              </span>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCloseModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props.onSaveChanges({
              data: {
                ...data,
                name,
                status,
                dueDate: new Date(dueDate).getTime(),
              },
              type: props.dataToEdit.type,
            });
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EditModal };
