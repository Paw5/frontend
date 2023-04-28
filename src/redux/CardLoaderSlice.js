/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const cardLoaderSlice = createSlice({
  name: 'cardLoader',
  initialState: {
    hasLoaded: false,
  },
  reducers: {
    setHasLoaded: (state, action) => {
      state.hasLoaded = action.payload;
    },
  },

});

export const { setHasLoaded } = cardLoaderSlice.actions;

export default cardLoaderSlice.reducer;
