import { PropsWithChildren, useState } from "react";
import { Toast } from "react-bootstrap";

type ToastItemProps = {
  header: string;
  bodyText: string;
  backgroundColor: string;
  onClose?: (toatsId: string) => void;
  delay?: number;
};

const ToastItem = (props: PropsWithChildren<ToastItemProps>) => {
  const [show, setShow] = useState(true);

  return (
    <Toast
      delay={props.delay}
      show={show}
      autohide={props.delay ? true : false}
      bg={props.backgroundColor}
      className="text-white"
      onClose={() => {
        console.log("onClose triigered");
        setShow(false);
        if (props.onClose) {
          props.onClose(props.bodyText);
        }
      }}
    >
      <Toast.Header>
        <strong className="me-auto">
          <i className="bi bi-bell-fill"></i> {props.header}
        </strong>
      </Toast.Header>
      <Toast.Body>{props.bodyText}</Toast.Body>
    </Toast>
  );
};

export { ToastItem };
