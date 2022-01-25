import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "../../hooks/useVisualMode";
import Form from './Form';



const Appointment = (props) => {
  //console.log("apppointment props", props);
  const { id, interview, bookInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back, history } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log(name, interviewer);
    props.bookInterview(id, interview);
    transition(SHOW);
  }
  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {/* {interview ? <Show student={interview.student} interviewer={interview.interviewer.id} /> : <Empty />} */}
        {console.log(mode)}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}

        />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && (
          <Form
            onCreate={() => console.log("Click onCreate")}
            interviewers={props.interviewers}
            onCancel={() => transition(EMPTY)}
            onSave={(name, interviewer) => save(name, interviewer)}
          />
        )}

      </article>

    </>
  )
};

export default Appointment;



