import { PropsWithChildren } from "react";
import { ToastContainer } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectToasts } from "../../store/toasts.slice";
import { ToastItem } from "./ToastItem";

type ToastsProps = {};

const Toasts = (props: PropsWithChildren<ToastsProps>) => {
  const toastList = useSelector(selectToasts);

  const toastClosedHandler = (tostId: string) => {};

  return (
    <>
      <div className="sticky-top">
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
    </>
  );
};

export { Toasts };
