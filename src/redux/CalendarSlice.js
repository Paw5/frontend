/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    calendarID: 'none',
  },
  reducers: {
    setCalendarID: (state, action) => {
      state.calendarID = action.payload;
    },
  },

});

export const { setCalendarID } = calendarSlice.actions;

export default calendarSlice.reducer;
