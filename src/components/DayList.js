import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;
  let parsedDaysArray = [];
  if (days) {
    parsedDaysArray = days.map((parseDay) => (
      <DayListItem
        key={parseDay.id}
        name={parseDay.name}
        spots={parseDay.spots}
        selected={parseDay.name === day}
        setDay={setDay}
      />
    ));
  }

  return <ul>{parsedDaysArray}</ul>;
}
