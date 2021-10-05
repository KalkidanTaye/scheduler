import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  function bookInterview(id, interview) {
    console.log(id, interview);
  }

  useEffect(() => {
    const daysURL = "/api/days";
    const appointmentsURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  });
  const setDay = (day) =>
    setState((prev) => {
      return { ...prev, day };
    });
  const mappedAppointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          // {...bookInterview()}
        />
      );
    }
  );
  // console.log("appointments:", mappedAppointments);
  // const mappedInterviewers = getInterviewersForDay(state, state.day).map(
  //   (interviewer) => {
  //     return <Appointment {...interviewer} />;
  //   }
  // );
  // console.log("interviewers", mappedInterviewers);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  console.log("interviewers", dailyInterviewers);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <DayList />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {/* {mappedAppointments}
        {mappedInterviewers} */}
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
