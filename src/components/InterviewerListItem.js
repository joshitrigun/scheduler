import classNames from 'classnames';
import React from 'react';
import "./InterviewerListItem.scss";
const InterviewerListItem = (props) => {
  const listClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })
  return <div>
    <li className={listClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : null}
    </li>
  </div >;
};

export default InterviewerListItem;
