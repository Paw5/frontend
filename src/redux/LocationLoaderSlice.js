/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const locationLoaderSlice = createSlice({
  name: 'locationLoader',
  initialState: {
    hasLoaded: false,
  },
  reducers: {
    setHasLoaded: (state, action) => {
      state.hasLoaded = action.payload;
    },
  },

});

export const { setHasLoaded } = locationLoaderSlice.actions;

export default locationLoaderSlice.reducer;
