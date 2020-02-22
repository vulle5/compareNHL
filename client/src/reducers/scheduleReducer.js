const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';

export const updateSchedule = data => {
  return {
    type: UPDATE_SCHEDULE,
    data
  }
};

const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_SCHEDULE:
      return action.data;
    default:
      return state;
  }
};

export default scheduleReducer;
