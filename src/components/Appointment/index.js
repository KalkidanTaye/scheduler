import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import "components/Appointment/style.scss";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";

export default function Appointment(props) {
  //REFACTOR
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  // console.log("interviewers", props.interviewers);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function remove() {
    transition(DELETING, true);
    cancelInterview(id).then(() => {
      transition(EMPTY);
    });
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onDelete={remove}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewer=""
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === CONFIRM && <Confirm onCancel={() => back()} />}
    </article>
  );
}
