import React from "react";
import "components/interviewerListItem.scss";
import classnames from "classnames";

export default function Application(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}