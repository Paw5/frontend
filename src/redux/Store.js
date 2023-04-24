import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './SettingsSlice';
import locationReducer from './LocationSlice';
import calendarReducer from './CalendarSlice';
import locloadReducer from './LocationLoaderSlice';

const store = configureStore({
  reducer: {
    locationLoader: locloadReducer,
    settings: settingsReducer,
    location: locationReducer,
    calendar: calendarReducer,
  },
});

export default store;
