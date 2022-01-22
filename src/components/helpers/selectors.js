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


//state has days which is an array 
// appointments is an object