import { PropsWithChildren, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { useDeleteGoalMutation } from "../../store/api/goalsApi";
import {
  massUpdateActions,
  selectMassUpdateIds,
} from "../../store/massUpdate.slice";
import { triggerToast } from "../../store/toasts.slice";
import { ConfirmModal } from "../confirm-modal/ConfirmModal";

type MassUpdateProps = {};

const MassUpdate = (props: PropsWithChildren<MassUpdateProps>) => {
  const dispatch = useAppDispatch();

  const massUpdateIds = useSelector(selectMassUpdateIds);
  const [deleteGoal] = useDeleteGoalMutation();
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [massUpdateType, setMassUpdateType] = useState<
    "delete" | "complete" | "in_progress" | "failed" | null
  >(null);

  const massUpdateHandler = () => {
    const requests: Promise<any>[] = [];

    switch (massUpdateType) {
      case "delete":
        massUpdateIds.forEach((id) => {
          requests.push(deleteGoal(id).unwrap());
        });

        Promise.all([...requests])
          .then(() => {
            dispatch(massUpdateActions.clearMassUpdateIds());
            dispatch(
              triggerToast({
                header: "Success",
                bodyText: "Goals Deleted successfully.",
                backgroundColor: "success",
                delay: 3000,
              })
            );
          })
          .catch((error) => {
            dispatch(
              triggerToast({
                header: "Error",
                bodyText:
                  "There was an error Deleting the goals. Please try again.",
                backgroundColor: "danger",
                delay: 3000,
              })
            );
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
          onClick={() => {
            setMassUpdateType("delete");
            setShowDeleteConfirmModal(true);
          }}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
      {showDeleteConfirmModal && (
        <ConfirmModal
          showModal={showDeleteConfirmModal}
          onCloseModal={() => {
            setShowDeleteConfirmModal(false);
          }}
          onOk={async () => {
            setShowDeleteConfirmModal(false);
            massUpdateHandler();
          }}
          bodytext={`Are you sure you want to ${massUpdateType}?`}
        ></ConfirmModal>
      )}
    </>
  );
};

export { MassUpdate };
