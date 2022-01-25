import React from 'react';
import "./InterviewerList.scss";
//import classNames from 'classnames';
import InterviewerListItem from './InterviewerListItem';


const InterviewerList = (props) => {
  const { value, interviewers, id, onChange } = props;
  const listInterviewers = interviewers.map(list => <InterviewerListItem
    key={list.id}
    name={list.name}
    avatar={list.avatar}
    selected={list.id === value}
    setInterviewer={
      e => onChange(list.id)
    }

  />)



  return (
    <>
      <section key={id}>
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
          {listInterviewers}
        </ul>
      </section>
    </>
  )
};

export default InterviewerList;


// const addMembers = (props) => {
//  props holds the object that was passed to the function when the function was called and in this case the object that was passed was {interviewer: 2, onChange: 3}
//   const { interviewer, onChange } = props;
//   return x + y
// }

// addMembers({ Interviewers: 2, onChange: 3 })