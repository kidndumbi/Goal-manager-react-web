import { PropsWithChildren } from "react";
import { ToastContainer } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastItem } from "./ToastItem";

type ToastsProps = {};

const Toasts = (props: PropsWithChildren<ToastsProps>) => {
  const toastList = useSelector((state: any) => state.toasts.toasts);

  const toastClosedHandler = (tostId: string) => {
    
  };

  return (
    <div>
      <ToastContainer
        style={{ zIndex: "99999" }}
        position="top-end"
        className="p-3"
      >
        {toastList.map((t: any, index: number) => (
          <ToastItem
            key={index}
            header={t.header}
            bodyText={t.bodyText}
            backgroundColor={t.backgroundColor}
            onClose={toastClosedHandler}
            delay={t.delay}
          ></ToastItem>
        ))}
      </ToastContainer>
    </div>
  );
};

export { Toasts };
