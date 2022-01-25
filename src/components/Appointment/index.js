import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "../../hooks/useVisualMode";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


const Appointment = (props) => {

  const { id, interview, bookInterview, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const ERROR = "ERROR";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    console.log("id", props.id);
    bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
    transition(SAVING);
  }

  function cancelAppointment() {

    transition(DELETE);
    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR);
      });

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
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && (
          <Form

            interviewers={props.interviewers}
            onCancel={() => transition(EMPTY)}
            onSave={(name, interviewer) => save(name, interviewer)}
          />
        )}
        {mode === SAVING && (
          <Status message="SAVING..." />
        )}
        {mode === DELETE && (
          <Status message="DELETING..." />
        )}
        {mode === CONFIRM && (
          <Confirm message="Do you want to delete it?"
            onCancel={() => back(SHOW)} onConfirm={cancelAppointment} />
        )}
        {mode === ERROR && (
          <Error message="Error found" />
        )}

      </article>

    </>
  )
};

export default Appointment;



