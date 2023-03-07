import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './SettingsSlice';
import locationReducer from './LocationSlice';
import calendarReducer from './CalendarSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    location: locationReducer,
    calendar: calendarReducer,
  },
});

export default store;
