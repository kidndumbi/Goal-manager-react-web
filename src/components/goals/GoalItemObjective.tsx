import { ObjectiveModel } from "../../models/ObjectiveModel.interface";
import { NotesIcon } from "../notes-icon/NotesIcon";
export function GoalItemObjective({
  objective,
  className,
}: {
  objective: ObjectiveModel;
  className: string;
}) {
  return (
    <li style={{listStyle: 'none'}}
      className={`${className} ${
        objective.status === "COMPLETE" && "text-decoration-line-through"
      } `}
    >

        <span>
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
