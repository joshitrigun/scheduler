import React from 'react';
import "./InterviewerList.scss";
//import classNames from 'classnames';
import InterviewerListItem from './InterviewerListItem';


const InterviewerList = (props) => {
  const { value, interviewers, id, setInterviewer } = props;
  const listInterviewers = interviewers.map(list => <InterviewerListItem
    key={list.id}
    name={list.name}
    avatar={list.avatar}
    selected={list.id === value}
    setInterviewer={
      e => setInterviewer(list.id)
    }

  />)



  return (
    <>
      <section className={listInterviewers} key={id}>
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {listInterviewers}
        </ul>
      </section>
    </>
  )
};

export default InterviewerList;
