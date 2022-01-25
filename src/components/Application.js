import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment"
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "components/helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],

    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(all => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);


  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },

    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("interview", id, interview);


    setState({
      ...state,
      appointments
    });
  }

  const setDay = day => setState({ ...state, day });



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
        <nav>

        </nav>
      </section>
    </main>
  );
}
