export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((day_) => day_.name === day);
  const appointmentArray =
    filteredDays.length !== 0
      ? filteredDays[0].appointments.map(
          (element) => state.appointments[element]
        )
      : [];
  return appointmentArray;
}
