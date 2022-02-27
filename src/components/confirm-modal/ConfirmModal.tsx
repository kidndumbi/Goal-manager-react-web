import { PropsWithChildren } from "react";
import { Button, Modal } from "react-bootstrap";

type ConfirmModalProps = {
  showModal: boolean;
  onCloseModal: () => void;
  onOk: (data: any) => void;
  bodytext: string;
};

const ConfirmModal = (props: PropsWithChildren<ConfirmModalProps>) => {
  return (
    <>
      <Modal show={props.showModal} onHide={props.onCloseModal}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>{props.bodytext}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.onOk}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ConfirmModal };
