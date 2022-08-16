import { PropsWithChildren } from "react";
import { Transition } from "react-transition-group";

interface AppTranstionProps {
  show: boolean;
}

const AppTranstion = ({
  show,
  children,
}: PropsWithChildren<AppTranstionProps>) => {
  const defaultStyles = {
    transition: `opacity 300ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles: any = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <>
      <Transition in={show} timeout={300}>
        {(state: any) => (
          <div
            style={{
              ...defaultStyles,
              ...transitionStyles[state],
            }}
          >
            {children}
          </div>
        )}
      </Transition>
    </>
  );
};

export { AppTranstion };
