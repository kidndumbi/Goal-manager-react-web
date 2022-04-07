import { ObjectiveModel } from "../../models/ObjectiveModel.interface";
import {
  checkIfDateGreater,
  checkIfDatesAreEqual,
} from "../../utils/dateTimeHelpers";
import { NotesIcon } from "../notes-icon/NotesIcon";
export function GoalItemObjective({
  objective,
  className,
}: {
  objective: ObjectiveModel;
  className: string;
}) {
  const getGoalItemColor = (dueDate: number) => {
    if (checkIfDateGreater(new Date(), new Date(dueDate!))) {
      return "red";
    }

    if (checkIfDatesAreEqual(new Date(dueDate!), new Date())) {
      return "yellow";
    }

    return "";
  };

  return (
    <li
      style={{ listStyle: "none" }}
      className={`${className} ${
        objective.status === "COMPLETE" && "text-decoration-line-through"
      } `}
    >
      <span style={{ color: getGoalItemColor(objective?.dueDate!) }}>
        {objective.name}
        <span>
          {objective?.notes && (
            <NotesIcon className="ms-2" text={objective?.notes} />
          )}
        </span>
      </span>
    </li>
  );
}
