import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;
  let parseInterviewerArray = [];
  if (interviewers) {
    parseInterviewerArray = interviewers.map((parseInterviewer) => (
      <InterviewerListItem
        key={parseInterviewer.id}
        name={parseInterviewer.name}
        avatar={parseInterviewer.avatar}
        selected={parseInterviewer.id === interviewer}
        setInterviewer={(event) => setInterviewer(parseInterviewer.id)}
      />
    ));
  }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parseInterviewerArray}</ul>
    </section>
  );
}
