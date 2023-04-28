/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const serviceLoaderSlice = createSlice({
  name: 'servicesLoader',
  initialState: {
    hasLoaded: false,
  },
  reducers: {
    setHasLoaded: (state, action) => {
      state.hasLoaded = action.payload;
    },
  },

});

export const { setHasLoaded } = serviceLoaderSlice.actions;

export default serviceLoaderSlice.reducer;
