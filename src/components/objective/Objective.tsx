import { Button, Card } from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { ObjectiveModel } from "../../models/ObjectiveModel.interface";
import { RootState } from "../../store";
import { selectStatusOptions } from "../../store/statusOptions.slice";
import { NotesIcon } from "../notes-icon/NotesIcon";

type ObjectiveProps = {
  data: ObjectiveModel;
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
  const statusOptions = useSelector(selectStatusOptions);

  return (
    <>
      <Card className={className}>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <span>{data.name}</span>
            <Button
              variant={`${
                data.markedForDeletion === true ? "outline-danger" : "danger"
              }`}
              onClick={onMarkedForDelete.bind(null, data)}
            >
              <i
                className={`me-1 bi  ${
                  data.markedForDeletion === true
                    ? "bi-arrow-counterclockwise"
                    : "bi-trash"
                }`}
              ></i>
              {`${data.markedForDeletion === true ? "Undo Delete" : "Delete"}`}
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
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
              <div>
                <strong>Status: </strong>
                {
                  statusOptions.find((stat: any) => stat.value === data?.status)
                    ?.name
                }
              </div>
              <div className="pt-2">
                <strong>Created On: </strong>
                <span>
                  <Moment format="dddd Do MMMM YYYY h:mm A">
                    {data?.createDate}
                  </Moment>
                </span>
              </div>
            </div>
            {data?.notes && <NotesIcon text={data?.notes} />}
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
