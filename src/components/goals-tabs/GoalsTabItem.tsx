/* eslint-disable jsx-a11y/anchor-is-valid */

import { MouseEventHandler, PropsWithChildren } from "react";

interface Props {
  className: string;
  background: string;
  count: number;
  tabName: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

const GoalsTabItem = (props: PropsWithChildren<Props>) => {
  return (
    <li className="nav-item">
      <a
        className={`nav-link ${props.className}`}
        style={{ cursor: "pointer" }}
        aria-current="page"
        onClick={props.onClick}
      >
        <span className={`badge ${props.background} me-1`}>{props.count}</span>
        {props.tabName}
      </a>
    </li>
  );
};

export default GoalsTabItem;
