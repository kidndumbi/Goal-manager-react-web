import { GoalItemObjective } from "./GoalItemObjective";
import { NotesIcon } from "../notes-icon/NotesIcon";
import Moment from "react-moment";
import "moment-timezone";
import { timeDiffCalc } from "../../utils/dateTimeHelpers";
import { useState, useEffect, PropsWithChildren } from "react";
import { GoalModel } from "../../models/GoalModel.interface";
import classes from "./GoalItem.module.scss";
import { GoalImageList } from "../goal-image-list/GoalImageList";
import { useAppDispatch } from "../../store";
import { massUpdateActions } from "../../store/massUpdate.slice";

interface Props {
  goal: GoalModel;
  className: string;
  onEdit: (id: string) => void;
}

const GoalItem = ({ goal, className, onEdit }: PropsWithChildren<Props>) => {
  const dispatch = useAppDispatch();

  const getStatusColor = (status: "FAILED" | "IN_PROGRESS" | "COMPLETE") => {
    const colors = {
      FAILED: "text-danger",
      IN_PROGRESS: "text-info",
      COMPLETE: "text-success",
    };

    return colors[status];
  };

  const getStatusDisplayName = (
    status: "FAILED" | "IN_PROGRESS" | "COMPLETE"
  ) => {
    const displayName = {
      FAILED: "FAILED",
      IN_PROGRESS: "IN PROGRESS",
      COMPLETE: "COMPLETE",
    };

    return displayName[status];
  };

  const [timeDisplayData, settimeDisplayData] = useState({
    ellapsed: timeDiffCalc(
      new Date(),
      goal.createDate ? new Date(goal.createDate) : new Date()
    ),
    remaining: timeDiffCalc(
      goal.dueDate ? new Date(goal.dueDate) : new Date(),
      new Date()
    ),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      settimeDisplayData({
        ellapsed: timeDiffCalc(
          new Date(),
          goal.createDate ? new Date(goal.createDate) : new Date()
        ),
        remaining: timeDiffCalc(
          goal.dueDate ? new Date(goal.dueDate) : new Date(),
          new Date()
        ),
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkboxClickHandler = (e: any) => {
    dispatch(
      massUpdateActions.setMassUpdateIds({
        id: goal.id,
        checked: e.target.checked,
      })
    );
  };

  return (
    <div className={`card w-100 text-start ${className}`}>
      <div className="card-body">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            onClick={checkboxClickHandler}
          ></input>
        </div>
        <h5 className="card-title">{goal.name}</h5>
        <span className="d-block">
          Created On:{" "}
          <Moment format="dddd Do MMMM YYYY h:mm A">{goal.createDate}</Moment>{" "}
        </span>
        <span className="d-block">
          Due: <Moment format="dddd Do MMMM YYYY h:mm A">{goal.dueDate}</Moment>{" "}
        </span>
        <span className="d-block ">
          Status:{" "}
          <span
            className={`fw-bold ${getStatusColor(
              goal.status || "IN_PROGRESS"
            )} `}
          >
            {getStatusDisplayName(goal.status || "IN_PROGRESS")}
          </span>
        </span>

        <div className="mb-2 mt-2">
          <span className="d-block">ellapsed: {timeDisplayData.ellapsed}</span>
          <span className="d-block">
            remaining: {timeDisplayData.remaining}
          </span>
          <span className="d-block">
            total:{" "}
            {timeDiffCalc(
              goal.dueDate ? new Date(goal.dueDate) : new Date(),
              goal.createDate ? new Date(goal.createDate) : new Date()
            )}
          </span>
        </div>
        <div>{goal.notes && <NotesIcon text={goal?.notes} />}</div>

        {goal.objectives && goal.objectives.length > 0 && (
          <div>
            <hr></hr>
            <h6>Objectives</h6>

            <ul className="ps-0">
              {goal.objectives.map((objective: any, index) => {
                return (
                  <GoalItemObjective
                    key={index}
                    objective={objective}
                    className={classes.objectiveTextColor}
                  />
                );
              })}
            </ul>
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={() => {
            onEdit(goal.id || "");
          }}
        >
          <i className="bi bi-pencil-square"></i>
        </button>
        <GoalImageList goal={goal}></GoalImageList>
      </div>
    </div>
  );
};

export default GoalItem;
