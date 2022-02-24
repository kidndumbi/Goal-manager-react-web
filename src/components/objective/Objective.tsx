import { Button, Card } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";

type ObjectiveProps = {
  data: any;
  onEdit: (objective: any) => void;
  onMarkedForDelete: (objective: any) => void;
  className?: string;
};

const Objective: React.FC<ObjectiveProps> = ({
  data,
  onEdit,
  className,
  onMarkedForDelete,
}) => {
  const statusOptions = useSelector(
    (state: any) => state.statusOptions.options
  );

  return (
    <>
      <Card className={className}>
        <Card.Header>{data.name}</Card.Header>
        <Card.Body>
          <Card.Title>
            <div className="d-flex justify-content-between">
              <span>Special title treatment</span>
              <Button
                variant="danger"
                onClick={onMarkedForDelete.bind(null, data)}
              >
                Delete
              </Button>
            </div>
          </Card.Title>
          <Card.Text>
            <div>
              <div className="pb-2">
                <strong>Due Date: </strong>
                <span>
                  <Moment format="dddd Do MMMM YYYY h:mm A">
                    {data?.dueDate}
                  </Moment>
                </span>
              </div>
              <label htmlFor="edit-goal-status">
                {" "}
                <strong>Status</strong>{" "}
              </label>
              <select
                id="edit-goal-status"
                className="form-control"
                value={data?.status}
                onChange={() => {}}
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
              <div className="pt-2">
                <strong>Created On: </strong>
                <span>
                  <Moment format="dddd Do MMMM YYYY h:mm A">
                    {data?.createDate}
                  </Moment>
                </span>
              </div>
            </div>
          </Card.Text>
          <Button variant="primary" onClick={onEdit.bind(null, data)}>
            Edit
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export { Objective };
