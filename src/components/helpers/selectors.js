export const getAppointmentsForDay = (state, day) => {

  const findDay = state.days.find(stateDays => {
    return stateDays.name === day
  })
  if (state.days.length === 0 || !findDay) {
    return [];
  }

  const results = findDay.appointments.map((getId) => {

    return state.appointments[getId]
  })
  return results
}

export const getInterviewersForDay = (state, day) => {
  //console.log("state", state)
  const findDay = state.days.find(stateDays => {
    return stateDays.name === day
  })
  if (state.days.length === 0 || !findDay) {
    return [];
  }

  const results = findDay.interviewers.map((getId) => {

    return state.interviewers[getId]
  })
  return results;

}

export const getInterview = (state, interview) => {
  //  / console.log("state", state);

  if (!interview) return null;
  const id = interview.interviewer;
  const interviewer = state.interviewers[id];

  return { ...interview, interviewer }

}
//state has days which is an array
// appointments is an object