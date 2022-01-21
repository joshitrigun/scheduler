import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

const index = (props) => {
  const { interview } = props;
  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {interview ? <Show student={interview.student} interviewer={interview.interviewer.id} /> : <Empty />}
      </article>

    </>
  )
};

export default index;



