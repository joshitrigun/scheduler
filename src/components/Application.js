import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment"

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "components/helpers/selectors";

import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  const { updateSpots, cancelInterview, bookInterview, setDay, state } = useApplicationData();


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersList = getInterviewersForDay(state, state.day);


  const setAppointments = dailyAppointments.map(appointment => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        interview={interview}
        interviewers={interviewersList}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        updateSpots={updateSpots}
      />)
  })

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
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {setAppointments}
        <Appointment key="last" id="last" time="5pm" />
      </section>
    </main>
  );
}
