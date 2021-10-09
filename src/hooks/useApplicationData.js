import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //update spots

  const spotsRemaining = (day, appointments) => {
    const dayFound = state.days.find((dayObj) => dayObj.name === day);
    const apptList = dayFound.appointments.map((appId) => appointments[appId]);
    const numOfSpots = apptList.filter(
      (appointment) => appointment.interview === null
    ).length;
    return numOfSpots;
  };

  //create appointment

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const numOfSpots = spotsRemaining(state.day, appointments);
    const updatedDays = state.days.map((dayObj) => {
      if (dayObj.appointments.includes(id)) {
        const newDay = { ...dayObj, spots: numOfSpots };
        return newDay;
      }
      return dayObj;
    });

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({
        ...state,
        appointments,
        days: updatedDays,
      });
    });
  }

  // cancel appointment
  function cancelInterview(id) {
    const appointment = { ...state.appointments[id] };

    appointment[id] = null;

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => ({
        ...prev,
        appointments: {
          ...prev.appointments,
        },
      }));
    });
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

  return { state, setDay, bookInterview, cancelInterview };
}
