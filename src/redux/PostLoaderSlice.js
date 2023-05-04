/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const postLoaderSlice = createSlice({
  name: 'postLoader',
  initialState: {
    hasLoaded: false,
  },
  reducers: {
    setHasLoaded: (state, action) => {
      state.hasLoaded = action.payload;
    },
  },

});

export const { setHasLoaded } = postLoaderSlice.actions;

export default postLoaderSlice.reducer;
