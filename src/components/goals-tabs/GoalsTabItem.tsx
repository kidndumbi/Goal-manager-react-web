/* eslint-disable jsx-a11y/anchor-is-valid */

import { MouseEventHandler, PropsWithChildren } from "react";

interface Props {
  className: string;
  background: string;
  count: number;
  tabName: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
  icon: string;
}

const GoalsTabItem = (props: PropsWithChildren<Props>) => {
  return (
    <li className="nav-item">
      <a
        className={`nav-link ${props.className}`}
        style={{ cursor: "pointer", padding: '0.25rem 0.5rem' }}
        aria-current="page"
        onClick={props.onClick}
      >
        <h4><span className={`badge ${props.background} me-1`}>{props.count} <i className={`bi ${props.icon}`}></i></span></h4>
      </a>
    </li>
  );
};

export default GoalsTabItem;
