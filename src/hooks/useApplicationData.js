import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({
        ...state,
        appointments,
      });
    });
  }
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
