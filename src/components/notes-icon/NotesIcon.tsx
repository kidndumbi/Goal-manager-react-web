import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
export function NotesIcon(props: { text: string , className?: string }) {
  return (
    <OverlayTrigger
      placement="right"
      delay={{
        show: 250,
        hide: 400,
      }}
      overlay={<Tooltip id="button-tooltip">{props.text}</Tooltip>}
    >
      <i
        style={{
          fontSize: "30px",
        }}
        className={`bi bi-card-text ${props.className}`}
      ></i>
    </OverlayTrigger>
  );
}
