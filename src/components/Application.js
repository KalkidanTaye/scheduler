import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 1,
    time: "2pm",
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Archie Cohen",
      interviewer: {
        id: 2,
        name: "Tori Malcom",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
    },
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Maria Boucher",
      interviewer: {
        id: 2,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      },
    },
  },
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState({ ...state, days });

  const mappedAppointments = appointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });
  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    axios.get(daysURL).then((response) => {
      console.log(response.data);
      setDays([...response.data]);
    });
  }, []);
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
        {mappedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
