import { useState, useEffect } from "react";
import axios from 'axios';



const useApplicationData = (props) => {

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
        console.log(all[0].data);
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  const setDay = day => setState({ ...state, day });

  // const getSpotsForDay = (day, appointments) => {
  //   let spots = 0;
  //   for (const id of day.appointments) {
  //     const appointment = appointments[id];
  //     if (!appointment.interview) {
  //       spots++;
  //     }
  //   }
  //   return spots;
  // }
  const updateSpots = (increment) => {

    const dayObj = state.days.find(day => day.name === state.day);
    console.log("dayObj:", dayObj);
    // const spots = getSpotsForDay(dayObj, state.appointments);

    const day = { ...dayObj, spots: increment ? dayObj.spots + 1 : dayObj.spots - 1 }
    console.log("day", day);
    //return state.days.map(d => d.name === state.day ? day : d);
    setState({ ...state, days: state.days.map(d => d.name === state.day ? day : d) })

    // axios.get('api/days')
    //   .then(response => {
    //     setState(prev => ({
    //       ...prev,
    //       days: response.data
    //     }))
    //   })
  }



  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },

    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        setState(prev => ({
          ...prev,
          appointments
        }));
        updateSpots(false);
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: {},

    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({
          ...state, appointments
        })
        updateSpots(true);
      })
  }


  return { updateSpots, cancelInterview, bookInterview, setDay, state }




}


export default useApplicationData;