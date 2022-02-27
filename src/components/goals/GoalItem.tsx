import Moment from "react-moment";
import "moment-timezone";
import { timeDiffCalc } from "../../utils/timeFormatting";
import { useState, useEffect, PropsWithChildren } from "react";
import { GoalModel } from "../../models/GoalModel.interface";

interface Props {
  goal: GoalModel;
  className: string;
  onEdit: (id: string) => void;
}

const GoalItem = ({ goal, className, onEdit }: PropsWithChildren<Props>) => {
  
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
    ellapsed: timeDiffCalc(new Date(), goal.createDate ? new Date(goal.createDate) : new Date()),
    remaining: timeDiffCalc(goal.dueDate ? new Date(goal.dueDate) : new Date(), new Date()),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      settimeDisplayData({
        ellapsed: timeDiffCalc(new Date(),  goal.createDate ? new Date(goal.createDate) : new Date()),
        remaining: timeDiffCalc(goal.dueDate ? new Date(goal.dueDate) : new Date(), new Date()),
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`card w-100 text-start ${className}`}>
      <div className="card-body">
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
          <span className={`fw-bold ${getStatusColor(goal.status || 'IN_PROGRESS')} `}>
            {getStatusDisplayName((goal.status || 'IN_PROGRESS'))}
          </span>
        </span>

        <div className="mb-2 mt-2">
          <span className="d-block">ellapsed: {timeDisplayData.ellapsed}</span>
          <span className="d-block">
            remaining: {timeDisplayData.remaining}
          </span>
          <span className="d-block">
            total:{" "}
            {timeDiffCalc(goal.dueDate ? new Date(goal.dueDate) : new Date(),goal.createDate ? new Date(goal.createDate) : new Date())}
          </span>
        </div>

        {goal.objectives && (
          <div>
            <ul>
              {goal.objectives.map((g: any) => {
                return (
                  <li
                    key={g.id}
                    className={`text-warning ${
                      g.status === "COMPLETE" && "text-decoration-line-through"
                    }`}
                  >
                    <span>{g.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={() => {
            onEdit(goal.id || '');
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default GoalItem;
