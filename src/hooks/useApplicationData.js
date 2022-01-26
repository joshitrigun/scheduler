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
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  const setDay = day => setState({ ...state, day });

  function updateSpots(id) {
    axios.get('api/days')
      .then(response => {
        setState(prev => ({
          ...prev,
          days: response.data
        }))
      })
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
        updateSpots(id);
      })
  }

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({
          ...state
        })
        updateSpots(id);
      })
  }


  return { updateSpots, cancelInterview, bookInterview, setDay, state }




}


export default useApplicationData;