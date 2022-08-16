import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { useDeleteGoalMutation } from "../../store/api/goalsApi";
import {
  massUpdateActions,
  selectMassUpdateIds,
} from "../../store/massUpdate.slice";

type MassUpdateProps = {};

const MassUpdate = (props: PropsWithChildren<MassUpdateProps>) => {
  const dispatch = useAppDispatch();

  const massUpdateIds = useSelector(selectMassUpdateIds);
  const [deleteGoal] = useDeleteGoalMutation();

  const massUpdateHandler = (
    massUpdateType: "delete" | "complete" | "in_progress" | "failed"
  ) => {
    const requests: Promise<any>[] = [];

    switch (massUpdateType) {
      case "delete":
        massUpdateIds.forEach((id) => {
          requests.push(deleteGoal(id));
        });

        Promise.all([...requests]).then(() => {
          dispatch(massUpdateActions.clearMassUpdateIds());
        });

        break;

      default:
        break;
    }
  };

  return (
    <>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <button type="button" className="btn btn-outline-secondary">
          Complete
        </button>
        <button type="button" className="btn btn-outline-secondary">
          Failed
        </button>
        <button
          onClick={() => massUpdateHandler("delete")}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export { MassUpdate };
