import { PropsWithChildren } from "react";
import { Button, Modal } from "react-bootstrap";

type ImageViewModalProps = {
  showModal: boolean;
  onCloseModal: () => void;
  onDelete: (data: any) => void;
};

const ImageViewModal = (props: PropsWithChildren<ImageViewModalProps>) => {
  return (
    <>
      <Modal show={props.showModal} onHide={props.onCloseModal}>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={props.onDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ImageViewModal };
